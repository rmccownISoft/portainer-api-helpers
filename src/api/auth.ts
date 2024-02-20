/**
 * Authenticates a user with Portainer.
 * 
 * @async
 * @param {string} portainerUrl - The base URL of the Portainer instance.
 * @param {string} userName - The username of the user.
 * @param {string} userPassword - The password of the user.
 * @returns {Promise<string>} A promise that resolves to a JSON Web Token (JWT) if the authentication is successful.
 * @throws {Error} Will throw an error if the authentication process encounters any issues.
 */
const portainerAuth = async ( portainerUrl: string, userName: string, userPassword:string): Promise<string> => {
    const path = 'api/auth'
	const user = {
        "Password": userPassword,
        "Username": userName
    }
    try {
		const response = await fetch(`${portainerUrl}${path}`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		})
		const jsonResponse = await response.json()
		return jsonResponse.jwt
	} catch (err) {
		const msg = `Error getting authorization token: ${err}`
        throw new Error(msg)
	}  
}