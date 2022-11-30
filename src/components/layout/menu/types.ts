/**
 * 菜单项
 */
export interface MenuOption {
  /**
   * 菜单名称
   */
  title: string
  /**
   * 菜单编码（对应 el-menu-item / el-sub-menu 组件的唯一标识 index 字段）
   */
  index: string
  /**
   * 菜单的图标
   */
  icon?: string
  /**
   * 子菜单
   */
  children?: MenuOption[]
}

