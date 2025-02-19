import {
  documentToReactComponents,
  Options
} from "@contentful/rich-text-react-renderer";
import {
  Block,
  Inline,
  Text,
  BLOCKS,
  INLINES,
  Document,
  Node
} from "@contentful/rich-text-types";
import { Asset } from "contentful";

// Type guard to check if target is an Asset with fields
const isAsset = (target: unknown): target is Asset => {
  return (
    typeof target === "object" &&
    target !== null &&
    "fields" in target &&
    (target as Asset).fields.file !== undefined
  );
};

// Render function for embedded assets
const renderEmbeddedAsset = (node: Block) => {
  const target = node.data.target as unknown;

  if (isAsset(target)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      (<img
        src={target.fields.file.url}
        alt={target.fields.title || "Embedded asset"}
      />)
    );
  }
  return null; // Fallback if the asset is not available
};

// Render function for hyperlinks
const renderHyperlink = (node: Inline) => {
  const uri = node.data.uri as string;
  const textContent = node.content
    .filter((child): child is Text => child.nodeType === "text") // Type guard for Text nodes
    .map((textNode) => textNode.value)
    .join(""); // Concatenate text content

  return (
    <a href={uri} target="_blank" rel="noopener noreferrer">
      {textContent}
    </a>
  );
};

// Contentful rich text helper
const renderDocument = (document: Document) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: renderEmbeddedAsset as (
        node: Node
      ) => JSX.Element | null,
      [INLINES.HYPERLINK]: renderHyperlink as (node: Node) => JSX.Element
    }
  };

  return documentToReactComponents(document, options);
};

export { renderDocument };
