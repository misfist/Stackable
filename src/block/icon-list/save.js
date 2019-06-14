import { withBlockStyles, withUniqueClass } from '@stackable/higher-order'
import { applyFilters } from '@wordpress/hooks'
import { BlockContainer } from '@stackable/components'
import classnames from 'classnames'
import { compose } from '@wordpress/compose'
import createStyles from './style'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

const save = props => {
	const { className } = props
	const {
		icon,
		text,
		design = '',
		displayAsGrid = false,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		`ugb-icon--icon-${ icon }`,
	], applyFilters( 'stackable.icon-list.mainclasses', {
		'ugb-icon-list--display-grid': displayAsGrid,
	}, design, props ) )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				<RichText.Content
					tagName="ul"
					value={ text }
				/>
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
