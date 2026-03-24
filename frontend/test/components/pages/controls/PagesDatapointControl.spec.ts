import { shallowMount } from '@vue/test-utils'
import PagesDatapointControl from '@/components/pages/controls/PagesDatapointControl.vue'

describe('PagesDatapointControl.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PagesDatapointControl, {
      propsData: {
        canvas: null,
        view: 'infos',
        editMode: false,
        page: {},
        element: {},
        scale: 1,
        backgroundColors: {},
        borderColors: {},
        fontColors: {},
        lastUpdate: {},
        greenAlarms: [],
        yellowAlarms: [],
        redAlarms: []
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
