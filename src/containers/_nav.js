import i18n from '../i18n'

export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: i18n.tc('Mentions'),
        to: '/mentions',
        icon: 'cil-speak'
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.tc('Articles'),
        to: '/articles',
        icon: 'cil-description'
      }
    ]
  }
]
