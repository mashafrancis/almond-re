/**
 * Checks if user is Admin or Regular User
 *
 * @param {string} role
 * @param {string} baseRole
 *
 * @returns {boolean}
 */
const checkUserRole = (role, baseRole) => role.toLowerCase() === baseRole.toLowerCase();

export default checkUserRole;
