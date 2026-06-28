import type { QueryMIMEType } from "../../../utils/mime-types";

type BasicOpenGraph = {
  /**
   * The title of your object as it should appear within the graph
   */
  title: string;
  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph.
   *
   * @default Astro.url
   */
  url?: URL;
};

type ImageOpenGraph = {
  /**
   * An image URL which should represent your object within the graph.
   */
  url: URL;

  type?: QueryMIMEType<"image">;

  /**
   * The number of pixels wide.
   */
  width?: number;

  /**
   * The number of pixels high.
   */
  height?: number;

  /**
   * A description of what is in the image (not a caption).
   */
  alt: string;
};

type VideoOpenGraph = {
  /**
   * An video URL which should represent your object within the graph.
   */
  url: URL;

  type?: QueryMIMEType<"video">;

  /**
   * The number of pixels wide.
   */
  width?: number;

  /**
   * The number of pixels high.
   */
  height?: number;

  /**
   * A description of what is in the video (not a caption).
   */
  alt: string;
};

type AudioOpenGraph = {
  /**
   * An audio URL which should represent your object within the graph.
   */
  url: URL;

  type?: QueryMIMEType<"audio">;
};

export type OpenGraph = {
  basic: BasicOpenGraph;
  optional?: {
    /**
     * A one to two sentence description of your object.
     */
    description?: string;

    /**
     * The word that appears before this object's title in a sentence.
     *
     * If `auto` is chosen, the consumer of your data should choose between "a" or "an"
     *
     * @default ""
     */
    determiner?: "a" | "an" | "the" | "auto" | "";

    /**
     * The locale these tags are marked up in. Of the format `language_TERRITORY`.
     *
     * @example
     *   "ja_JP";
     *
     * @default "en_US"
     */
    locale?: string;

    /**
     * An array of other {@link locale} this page is available in.
     */
    localeAlternate?: string[];

    /**
     * If your object is part of a larger web site, the name which should be displayed for the
     * overall site.
     *
     * @example
     *   "IMDb";
     */
    siteName?: string;
  };

  image?: ImageOpenGraph;
  video?: VideoOpenGraph;
  audio?: AudioOpenGraph;
};
