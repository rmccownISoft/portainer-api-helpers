/**
 * Sends a GET request to Portainer API.
 * 
 * @async
 * @param {string} authToken - The authorization token for the Portainer API.
 * @param {string} portainerUrl - The base URL of the Portainer instance.
 * @param {string} apiPath - The path of the API endpoint.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the API endpoint.
 * @throws {Error} Will throw an error if the fetch operation encounters any issues.
 */
export async function getPortainer(authToken, portainerUrl, apiPath) {
    try {
        const response = await fetch(`${portainerUrl}${apiPath}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`)
        }

        return await response.json()
    } catch (err) {
        console.error(`Failed to fetch from ${apiPath}: ${err.message}`)
        throw err
    }

}

/**
 * Sends a POST request to Portainer API.
 * 
 * @async
 * @param {string} authToken - The authorization token for the Portainer API.
 * @param {string} portainerUrl - The base URL of the Portainer instance.
 * @param {string} apiPath - The path of the API endpoint.
 * @param {Object} data -The data to be sent as the body of the POST request
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the API endpoint.
 * @throws {Error} Will throw an error if the fetch operation encounters any issues.
 */
export async function postPortainer(authToken, portainerUrl, apiPath, data) {
    const rawResponse = await fetch(`${portainerUrl}${apiPath}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
	if (rawResponse.status === 409) {
		throw new Error('Conflict (409)')
	}
	if (!rawResponse.ok) {
		throw new Error(`Request failed with status ${rawResponse.status}`);
	}
	const response = await rawResponse.json()
    return response
}