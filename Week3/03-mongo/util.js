const { Course } = require("./db/index");

/**
 * Gets courses information from the DB, given a list of course Ids.
 * @param {*} courses : list of course Ids
 * @returns a promise that gets resolved when the information is available for all the course Ids
 */
async function getCourses(courses) {
  const coursePromises = [];
  courses.forEach((courseId) => {
    const coursePromise = Course.findById(courseId);
    coursePromises.push(coursePromise);
  });
  return Promise.all(coursePromises);
}

module.exports = {
  getCourses,
};
