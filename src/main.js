const core = require('@actions/core')
const { default: axios } = require('axios')

const CF_BASE_API_URL = 'https://api.cloudflare.com/client/v4'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // Recover CF input params
    const zone = core.getInput('CLOUDFLARE_ZONE', { required: true })
    const token = core.getInput('CLOUDFLARE_TOKEN', { required: true })

    // Perform cache purging
    await axios.post(`${CF_BASE_API_URL}/zones/${zone}/purge_cache`, {
      purge_everything: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
