import { PrismaClient } from "@prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { hash } from "bcryptjs";
import { agents } from "../src/data/agents";
import { leads } from "../src/data/leads";
import { properties } from "../src/data/properties";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is required to seed TiDB.");
}

const adapter = new PrismaTiDBCloud({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = process.env.SEED_AGENT_PASSWORD ?? "PrimeProperty123!";
  const passwordHash = await hash(password, 12);

  await prisma.leadReply.deleteMany();
  await prisma.agentProperty.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.property.deleteMany();
  await prisma.rateLimit.deleteMany();

  for (const [index, property] of properties.entries()) {
    await prisma.property.create({
      data: {
        id: property.id,
        slug: property.id,
        name: property.name,
        area: property.area,
        address: property.address,
        price: BigInt(property.price),
        type: property.type,
        status: property.status,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqm: property.areaSqm,
        certificate: property.certificate,
        yearBuilt: property.yearBuilt,
        description: property.description,
        imageUrl: property.imageUrl,
        imageAlt: property.imageAlt,
        isFeatured: index < 6,
        featuredRank: index + 1,
        images: {
          create: property.gallery.map((url, imageIndex) => ({
            url,
            alt: `${property.name} - galeri ${imageIndex + 1}`,
            sortOrder: imageIndex + 1,
          })),
        },
      },
    });
  }

  for (const agent of agents) {
    await prisma.agent.create({
      data: {
        id: agent.id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        role: agent.role,
        status: agent.status,
        avatarColor: agent.avatarColor,
        joinedAt: new Date(`${agent.joinedAt}T00:00:00+07:00`),
        passwordHash,
        properties: {
          create: agent.propertyIds.map((propertyId) => ({ propertyId })),
        },
      },
    });
  }

  for (const lead of leads) {
    await prisma.lead.create({
      data: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        subject: lead.subject,
        message: lead.message,
        propertyId: lead.propertyId,
        status: lead.status,
        createdAt: new Date(lead.createdAt),
        repliedAt: lead.repliedAt ? new Date(lead.repliedAt) : undefined,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
