/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Client } from '@elastic/elasticsearch';
import schema from './ElasticsearchIndex.json';

async function elasticsearchIndex({ request, connection }) {
  const client = new Client(connection);
  const body = {
    ...request,
    index: request.index || connection.index,
  };

  const { body: response } = await client.index(body);

  return {
    response,
    id: response._id,
  };
}

export default { resolver: elasticsearchIndex, schema, checkRead: false, checkWrite: true };
