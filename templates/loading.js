module.exports = function (h) {
  return function() {
    return h('div.loading',
      h('div.loading-wrapper-left.loading-wrapper',
        h('div.loading-ball-left.loading-ball')
      ),
      h('div.loading-wrapper-right.loading-wrapper',
        h('div.loading-ball-right.loading-ball')
      )
    );
  }
};
