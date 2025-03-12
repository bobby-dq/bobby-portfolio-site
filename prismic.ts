import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

export const repositoryName =
  process.env.PRISMIC_REPOSITORY_NAME || "bobby-quilacio-portfolio";

export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
  });

  return client;
};
