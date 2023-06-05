import PropTypes from 'prop-types/prop-types'
export default {
  props: {
    type: PropTypes.oneOf(['default', 'primary', 'outline', 'link', 'error', 'delete']),
    shape: PropTypes.oneOf(['round', 'rectangle']),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    margin: PropTypes.string
  },
  events: {
    onClick: [
      { name: 'e', type: PropTypes.object }
    ]
  }
}
