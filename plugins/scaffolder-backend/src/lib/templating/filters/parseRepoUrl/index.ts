/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ScmIntegrations } from '@backstage/integration';
import { parseRepoUrl } from '@backstage/plugin-scaffolder-node';
import { createTemplateFilter } from '@backstage/plugin-scaffolder-node/alpha';
import { examples } from './examples';

export const createParseRepoUrl = (integrations: ScmIntegrations) =>
  createTemplateFilter({
    id: 'parseRepoUrl',
    description:
      'Parses a repository URL into its constituent parts: owner, repository name, etc.',
    schema: z =>
      z.function(
        z.tuple([
          z.string().describe('repo URL as collected from repository picker'),
        ]),
        z
          .object({
            repo: z.string(),
            host: z.string(),
          })
          .merge(
            z
              .object({
                owner: z.string(),
                organization: z.string(),
                workspace: z.string(),
                project: z.string(),
              })
              .partial(),
          )
          .describe('`RepoSpec`'),
      ),
    examples,
    filter: url => parseRepoUrl(url, integrations),
  });
