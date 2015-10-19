module.exports = function(h){
  return {
    blog: require('./blog')(h),
    error: require('./error')(h),
    info: require('./info')(h),
    listing: require('./listing')(h),
    loading: require('./loading')(h),
    post: require('./post')(h),
    wrapper: require('./wrapper')(h)
  };
};
