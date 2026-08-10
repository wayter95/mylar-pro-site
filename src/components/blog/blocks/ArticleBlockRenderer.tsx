import { CalloutBlock } from "@/components/blog/blocks/CalloutBlock";
import { ComparisonBlock } from "@/components/blog/blocks/ComparisonBlock";
import { CtaBlock } from "@/components/blog/blocks/CtaBlock";
import { FaqBlock } from "@/components/blog/blocks/FaqBlock";
import { FeatureBlock } from "@/components/blog/blocks/FeatureBlock";
import { ImageBlock } from "@/components/blog/blocks/ImageBlock";
import { RelatedPostsBlock } from "@/components/blog/blocks/RelatedPostsBlock";
import { RichTextBlock } from "@/components/blog/blocks/RichTextBlock";
import { TableBlock } from "@/components/blog/blocks/TableBlock";
import { VideoBlock } from "@/components/blog/blocks/VideoBlock";
import type { ArticleBlock } from "@/sanity/types/content";

export function ArticleBlockRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "richTextBlock":
            return <RichTextBlock key={block._key} content={block.content} />;
          case "imageBlock":
            return <ImageBlock key={block._key} image={block.image} />;
          case "calloutBlock":
            return <CalloutBlock key={block._key} {...block} />;
          case "ctaBlock":
            return <CtaBlock key={block._key} {...block} />;
          case "featureBlock":
            return <FeatureBlock key={block._key} {...block} />;
          case "tableBlock":
            return <TableBlock key={block._key} {...block} />;
          case "comparisonBlock":
            return <ComparisonBlock key={block._key} {...block} />;
          case "faqBlock":
            return <FaqBlock key={block._key} {...block} />;
          case "videoBlock":
            return <VideoBlock key={block._key} {...block} />;
          case "relatedPostsBlock":
            return (
              <RelatedPostsBlock
                key={block._key}
                title={block.title}
                posts={block.posts}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
