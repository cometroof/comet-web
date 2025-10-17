# Dictionary Usage in COMET Project

This document provides examples and guidelines for using the new dictionary system in the COMET project.

## Overview

The dictionary system has been refactored to support one JSON file per page, making it easier to manage translations for each page separately. This approach improves maintainability and loading performance.

## Directory Structure

```
src/app/[lang]/dictionaries/
├── en/
│   └── pages/
│       ├── common.json    # Shared translations across the site
│       ├── home.json      # Home page translations
│       ├── contact.json   # Contact page translations
│       └── ...            # Other page-specific translations
├── id/
│   └── pages/
│       ├── common.json
│       ├── home.json
│       ├── contact.json
│       └── ...
└── index.ts              # Dictionary loader
```

## API

The dictionary system provides two main functions:

### 1. `getPageDictionary(locale, page)`

This is the recommended approach for optimal performance. It loads only the dictionary for a specific page.

```typescript
import { getPageDictionary } from '@/app/[lang]/dictionaries';

// In a page component
export default async function HomePage({ params: { lang } }) {
  const dict = await getPageDictionary(lang, 'home');
  
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: dict.cover.heading }} />
      <p>{dict.cover.description}</p>
    </div>
  );
}
```

### 2. `getDictionary(locale)`

This is the legacy approach that loads all dictionaries. Use only when necessary.

```typescript
import { getDictionary } from '@/app/[lang]/dictionaries';

// In a page component
export default async function AppLayout({ params: { lang } }) {
  const dict = await getDictionary(lang);
  
  return (
    <div>
      {/* Navigation using common dictionary */}
      <nav>
        <a href="/">{dict.common.navigation.home}</a>
        <a href="/about">{dict.common.navigation.about}</a>
      </nav>
      
      {/* Page content */}
      <main>{children}</main>
      
      {/* Footer */}
      <footer>
        <p>{dict.common.footer.rights}</p>
      </footer>
    </div>
  );
}
```

## Adding New Pages

When adding a new page:

1. Create JSON files for each language:
   ```
   src/app/[lang]/dictionaries/en/pages/your-page.json
   src/app/[lang]/dictionaries/id/pages/your-page.json
   ```

2. Update `index.ts` to include the new page:
   ```typescript
   // Add to validPages
   const validPages = ["home", "contact", "common", "your-page"];
   
   // Add to getAll() in both en and id dictionaries
   import("./en/pages/your-page.json").then((module) => ({
     "your-page": module.default,
   })),
   ```

## TypeScript Support

For better type safety, consider creating specific types for each page dictionary:

```typescript
// src/types/dictionary.ts
export type PageDictionary = Record<string, unknown>;

// You can create specific types for each page
export interface HomeDictionary extends PageDictionary {
  cover: {
    heading: string;
    description: string;
    poet: string;
  };
  product: { 
    head: string 
  };
  // ...
}

export interface Dictionary {
  [pageName: string]: PageDictionary;
}
```

## Best Practices

1. **Page-specific usage**: Use `getPageDictionary` whenever possible to minimize loading time
2. **Shared translations**: Put commonly used texts in `common.json`
3. **HTML in translations**: For translations containing HTML, use `dangerouslySetInnerHTML`
4. **Structure**: Maintain a consistent nested structure for each page
5. **Type safety**: Create TypeScript interfaces for better development experience