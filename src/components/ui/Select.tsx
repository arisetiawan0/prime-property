"use client";

import { useState, useRef, useEffect, useId, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "form" | "filter";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  leftIcon?: ReactNode;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  variant = "form",
  className = "",
  ariaLabel,
  disabled = false,
  id,
  name,
  leftIcon,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const listboxId = id || `select-${generatedId}`;

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label || placeholder;
  const isPlaceholder = !selected || selected.disabled;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  const openDropdown = () => {
    if (disabled) return;
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!open) {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    const enabledOptions = options.filter((o) => !o.disabled);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const currentEnabledIdx = enabledOptions.findIndex(
          (o) => o.value === options[prev]?.value
        );
        const nextEnabledIdx =
          currentEnabledIdx === -1
            ? 0
            : (currentEnabledIdx + 1) % enabledOptions.length;
        return options.findIndex((o) => o.value === enabledOptions[nextEnabledIdx].value);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const currentEnabledIdx = enabledOptions.findIndex(
          (o) => o.value === options[prev]?.value
        );
        const prevEnabledIdx =
          currentEnabledIdx === -1
            ? enabledOptions.length - 1
            : (currentEnabledIdx - 1 + enabledOptions.length) % enabledOptions.length;
        return options.findIndex((o) => o.value === enabledOptions[prevEnabledIdx].value);
      });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const option = options[activeIndex];
      if (option && !option.disabled) {
        handleSelect(option);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const baseButton =
    "w-full flex items-center gap-2 text-sm rounded-xl outline-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const leftPad = leftIcon
    ? variant === "form"
      ? "pl-10"
      : "pl-9"
    : variant === "form"
    ? "pl-4"
    : "pl-3";

  const variantClasses = {
    form: `${baseButton} bg-cream border border-pebble ${leftPad} pr-10 py-3 text-charcoal hover:border-charcoal/20 focus:border-gold focus:ring-2 focus:ring-gold/20`,
    filter: `${baseButton} bg-pebble/60 border border-transparent ${leftPad} pr-9 py-2.5 text-charcoal hover:bg-pebble focus:bg-pure-white focus:border-gold focus:ring-4 focus:ring-gold/15`,
  }[variant];

  const chevronPosition = variant === "form" ? "right-4" : "right-2.5";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (disabled) return;
          if (open) {
            setOpen(false);
          } else {
            openDropdown();
          }
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        className={variantClasses}
      >
        {leftIcon && (
          <span
            className="shrink-0 text-charcoal/40 pointer-events-none"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        <span
          className={`truncate text-left flex-1 ${
            isPlaceholder ? "text-charcoal/40" : "text-charcoal"
          }`}
        >
          {displayLabel}
        </span>
        <ChevronDown
          className={`${chevronPosition} absolute w-4 h-4 text-charcoal/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-auto bg-pure-white border border-pebble rounded-xl shadow-xl py-1 focus:outline-none"
            tabIndex={-1}
          >
            {options.map((option, idx) => {
              const isSelected = option.value === value;
              const isActive = idx === activeIndex;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`relative flex items-center justify-between gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    option.disabled
                      ? "text-charcoal/35 cursor-not-allowed"
                      : isActive
                      ? "bg-cream text-charcoal"
                      : "text-charcoal/80 hover:bg-cream"
                  }`}
                >
                  <span className="truncate flex-1">{option.label}</span>
                  {isSelected && !option.disabled && (
                    <Check
                      className="w-4 h-4 text-gold-dark shrink-0"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
