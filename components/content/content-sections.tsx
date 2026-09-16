import type { ContentSection } from "@/lib/content/help";

type ContentSectionsProps = {
  sections: ContentSection[];
};

export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-base font-semibold text-foreground md:text-lg">
            {section.title}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
