import { Icon } from '@iconify/vue'
export function useRenderIcon(icon) {
  return defineComponent({
    name: 'MyIcon',
    render() {
      const attrs = this.$attrs
      return h(
        Icon,
        {
          icon,
          ...attrs,
        },
        {
          default: () => [],
        },
      )
    },
  })
}
