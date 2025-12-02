# Sticky Component Usage Examples

Terdapat 3 cara untuk menggunakan sticky functionality:

## 1. Component-based dengan StickyWrapper (Recommended untuk fleksibilitas)

```tsx
import StickyWrapper from "@/components/app/sticky-wrapper";

function MyPage() {
  return (
    <StickyWrapper enableSticky={true} stickyTop={0}>
      <div className="my-custom-banner">
        <h1>My Content</h1>
        <p>This will be sticky</p>
      </div>
    </StickyWrapper>
  );
}
```

## 2. Custom Hook dengan useSticky (Recommended untuk kontrol penuh)

```tsx
import { useSticky } from "@/components/app/use-sticky";

function MyCustomComponent() {
  const { elementRef, spacerRef, isSticky } = useSticky({
    enableSticky: true,
    stickyTop: 0,
    onStickyChange: (sticky) => console.log("Sticky state:", sticky),
  });

  return (
    <>
      <div ref={spacerRef} style={{ height: 0 }} />
      <div ref={elementRef} className={isSticky ? "shadow-lg" : ""}>
        <h1>My Content</h1>
      </div>
    </>
  );
}
```

## 3. HOC Pattern dengan withSticky

```tsx
import { withSticky, StickyInjectedProps } from "@/components/app/with-sticky";

interface MyComponentProps extends StickyInjectedProps {
  title: string;
}

function MyComponentBase({ title, bannerRef, spacerRef }: MyComponentProps) {
  return (
    <>
      <div ref={spacerRef} style={{ height: 0 }} />
      <div ref={bannerRef}>
        <h1>{title}</h1>
      </div>
    </>
  );
}

const MyComponent = withSticky(MyComponentBase);

// Usage
<MyComponent title="Hello" enableSticky={true} stickyTop={0} />;
```

## 4. SeparatorBanner - Dua Versi

### Versi Default (HOC)

```tsx
import SeparatorBanner from "@/components/app/separator-banner";

<SeparatorBanner imgUrl="/banner.jpg" enableSticky={true} stickyTop={0}>
  <div>Content</div>
</SeparatorBanner>;
```

### Versi Component-based

```tsx
import { SeparatorBannerWithWrapper } from "@/components/app/separator-banner";

<SeparatorBannerWithWrapper
  imgUrl="/banner.jpg"
  enableSticky={true}
  stickyTop={0}
>
  <div>Content</div>
</SeparatorBannerWithWrapper>;
```

## Perbandingan

| Method        | Fleksibilitas | Kompleksitas | Use Case                    |
| ------------- | ------------- | ------------ | --------------------------- |
| StickyWrapper | ⭐⭐⭐⭐⭐    | ⭐           | Wrap any content quickly    |
| useSticky     | ⭐⭐⭐⭐⭐    | ⭐⭐⭐       | Full control over structure |
| withSticky    | ⭐⭐⭐        | ⭐⭐         | Reusable components         |

## Props yang Tersedia

- `enableSticky`: boolean (default: true) - Enable/disable sticky behavior
- `stickyTop`: number (default: 0) - Top offset when sticky
- `onStickyChange`: (isSticky: boolean) => void - Callback when sticky state changes (StickyWrapper & useSticky only)
