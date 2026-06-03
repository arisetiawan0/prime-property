export type AgentStatus = "aktif" | "nonaktif";

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Senior Agent" | "Agent" | "Junior Agent";
  status: AgentStatus;
  propertyIds: string[];
  joinedAt: string;
  avatarColor: string;
}

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Sari Anggraeni",
    email: "sari.anggraeni@primeproperty.com",
    phone: "081211112222",
    role: "Senior Agent",
    status: "aktif",
    propertyIds: ["villa-serenity", "oasis-townhouse"],
    joinedAt: "2022-03-15",
    avatarColor: "#C9A961",
  },
  {
    id: "agent-002",
    name: "Bambang Suryadi",
    email: "bambang.suryadi@primeproperty.com",
    phone: "081322223333",
    role: "Senior Agent",
    status: "aktif",
    propertyIds: ["ruko-bisnis-prime", "apartemen-panorama"],
    joinedAt: "2021-08-20",
    avatarColor: "#A88B4A",
  },
  {
    id: "agent-003",
    name: "Citra Maharani",
    email: "citra.maharani@primeproperty.com",
    phone: "081433334444",
    role: "Agent",
    status: "aktif",
    propertyIds: ["residensi-harmoni"],
    joinedAt: "2023-06-10",
    avatarColor: "#B33A3A",
  },
  {
    id: "agent-004",
    name: "Dimas Prasetyo",
    email: "dimas.prasetyo@primeproperty.com",
    phone: "081544445555",
    role: "Junior Agent",
    status: "aktif",
    propertyIds: ["kavling-eksklusif"],
    joinedAt: "2024-01-05",
    avatarColor: "#1A1A1A",
  },
  {
    id: "agent-005",
    name: "Eka Putri Lestari",
    email: "eka.putri@primeproperty.com",
    phone: "081655556666",
    role: "Agent",
    status: "nonaktif",
    propertyIds: [],
    joinedAt: "2023-11-22",
    avatarColor: "#92400E",
  },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
