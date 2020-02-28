/**
 * Checks if user is Admin or Regular User
 *
 * @param {string} role
 * @param {string} baseRole
 *
 * @returns {boolean}
 */
const checkUserRole = (role, baseRole) => {
  return role.toLowerCase() === baseRole.toLowerCase();
};

export default checkUserRole;
