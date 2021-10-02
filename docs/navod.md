---
sidebar_position: 1
slug: /
---

# Vytváranie dokumentácie

Pridať `.md` alebo `.mdx` do priečinka `docs`.

Prvý nadpis (H1 `# Nadpis`) bude zároveň názvom v menu.

Sub menu sa robí iba sub priečinok a do neho sa vkladajú súbory. V tomto priečinku by mal byť súbor `_category_.json` v ktorom bude zadefinovaný názov submenu:

```json
{
  "label": "Moje submenu",
  "position": 3
}
```
