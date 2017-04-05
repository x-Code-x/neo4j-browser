import classNames from 'classnames'
import { StyledNavigationButton, NavigationButtonContainer } from 'browser-components/buttons'
import { StyledDrawer } from './styled'
const Navigation = ({
  openDrawer,
  onNavClick,
  topNavItems,
  bottomNavItems = [],
  selectedItemClassName,
  tabClassName,
  sidebarClassName,
  listClassName
}) => {
  const buildNavList = (list, selected) => {
    return list.map((item, index) => {
      const isOpen = item.name.toLowerCase() === selected
      return (
        <NavigationButtonContainer
          key={index}
          onClick={() => onNavClick(item.name.toLowerCase())}
          isOpen={isOpen}
        >
          <StyledNavigationButton name={item.name}>{item.icon(isOpen)}</StyledNavigationButton>
        </NavigationButtonContainer>
      )
    })
  }
  const getContentToShow = (openDrawer) => {
    if (openDrawer) {
      let filteredList = topNavItems.concat(bottomNavItems).filter((item) => {
        return item.name.toLowerCase() === openDrawer
      })
      let TabContent = filteredList[0].content
      return <TabContent />
    }
    return null
  }
  const topNavItemsList = buildNavList(topNavItems, openDrawer)
  const bottomNavItemsList = buildNavList(bottomNavItems, openDrawer)
  const tabClass = classNames({
    hidden: !openDrawer,
    [tabClassName]: true
  })
  return (
    <div className={sidebarClassName}>
      <ul className={listClassName}>
        <ul className={listClassName}>{topNavItemsList}</ul>
        <ul className={listClassName}>{bottomNavItemsList}</ul>
      </ul>
      <StyledDrawer className={tabClass}>
        <div className='tab'>
          {getContentToShow(openDrawer)}
        </div>
      </StyledDrawer>
    </div>
  )
}

export default Navigation