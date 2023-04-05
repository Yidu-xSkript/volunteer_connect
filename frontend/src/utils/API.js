function API() {
    // const dev_api_url = 'http://127.0.0.1:5000/api/v1'
    const prod_api_url = 'https://volunteerconnect-production.up.railway.app/api/v1'

    const api_url = prod_api_url;

    return {
        'auth_api_url': `/auth`,
        'base_api_url': api_url
    }
}

export default API;