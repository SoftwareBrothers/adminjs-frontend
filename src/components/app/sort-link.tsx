import React, { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Icon, cssClass } from '@adminjs/design-system'

import { BasePropertyJSON } from '../../interfaces'
import withRouter from '../../hooks/withRouter'

export type SortLinkProps = {
  property: BasePropertyJSON;
  direction?: 'asc' | 'desc';
  sortBy?: string;
}

class SortLink extends React.PureComponent<SortLinkProps> {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  isActive(): boolean {
    const { sortBy, property } = this.props
    return sortBy === property.propertyPath
  }

  render(): ReactNode {
    const { property, direction } = this.props
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const oppositeDirection = (this.isActive() && direction === 'asc') ? 'desc' : 'asc'
    const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`

    query.set('direction', oppositeDirection)
    query.set('sortBy', property.propertyPath)

    return (
      <NavLink to={{ search: query.toString() }} className={cssClass('SortLink')}>
        {property.label}
        {this.isActive() ? (<Icon icon={sortedByIcon} color="primary100" ml="default" />) : ''}
      </NavLink>
    )
  }
}

export default withRouter(SortLink)
