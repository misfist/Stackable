/**
 * This file only contains Premium notices and Premium panel notices.
 */
/**
 * External dependencies
 */
import { ProControl } from '~stackable/components'
import { i18n, showProNotice } from 'stackable'

/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import { addFilter } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { PanelBody } from '@wordpress/components'

if ( showProNotice ) {
	addFilter( 'stackable.separator.edit.inspector.style.after', 'stackable/separator', output => {
		return (
			<Fragment>
				{ output }
				<PanelBody
					initialOpen={ false }
					title={ sprintf( _x( '%s %d', 'Nth Title', i18n ), __( 'Layer', i18n ), 2 ) }
				>
					<ProControl
						title={ __( 'Say Hello to Gorgeous Separators 👋', i18n ) }
						description={ __( 'Add a second layer to this separator and make it look even sweeter. This feature is only available on Stackable Premium', i18n ) }
					/>
				</PanelBody>
				<PanelBody
					initialOpen={ false }
					title={ sprintf( _x( '%s %d', 'Nth Title', i18n ), __( 'Layer', i18n ), 3 ) }
				>
					<ProControl
						title={ __( 'Say Hello to Gorgeous Separators 👋', i18n ) }
						description={ __( 'Add a third layer to this separator and make it look even sweeter. This feature is only available on Stackable Premium', i18n ) }
					/>
				</PanelBody>
			</Fragment>
		)
	} )
}
