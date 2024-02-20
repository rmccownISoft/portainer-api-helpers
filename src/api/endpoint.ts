

export async function getEndpointsByTag(authToken: string, tag: string) {
    const path = `/api/endpoints?start=1&sort=&order=asc&search=${tag}&excludeSnapshots=true`

    return await getPortainer(token, baseUrl, path)
}