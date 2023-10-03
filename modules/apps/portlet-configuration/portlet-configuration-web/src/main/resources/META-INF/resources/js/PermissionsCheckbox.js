/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {ClayCheckbox} from '@clayui/form';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

export default function PermissionsCheckbox({
	checked: initialChecked,
	componentId: _componentId,
	indeterminate: initialIndeterminate,
	locale: _locale,
	portletId: _portletId,
	portletNamespace: _portletNamespace,
	...otherProps
}) {
	const [checked, setChecked] = useState(
		Boolean(initialChecked || initialIndeterminate)
	);
	const [indeterminate, setIndeterminate] = useState(
		Boolean(initialIndeterminate)
	);
	const count = document.getElementById(_portletNamespace + 'count');
	const saveButton = document.getElementById(
		_portletNamespace + 'saveButton'
	);
	const eventCount = document.getElementById(
		_portletNamespace + 'eventCount'
	);

	const [value, setValue] = useState(
		initialIndeterminate ? 'indeterminate' : ''
	);

	const propagationNavigationBar = document.getElementById(
		_portletNamespace + 'propagationNavigationBar'
	);

	const navLinks = propagationNavigationBar.getElementsByClassName(
		'nav-link'
	);

	for (let i = 0; i < navLinks.length; i++) {
		const navLink = navLinks.item(i);
		const _listener = function (event) {
			openPopUp(event, navLink.href);
		};

		if (Number(count.value) !== 0 && Number(eventCount.value) == 81) {
			navLink.addEventListener('click', (navLink.fn = _listener), false);
		}

		if (Number(count.value) == 0) {
			navLink.removeEventListener('click', navLink.fn, false);
		}
	}

	eventCount.value = Number(eventCount.value) + 1;

	function openPopUp(event, href) {
		event.preventDefault(); // this line prevents changing to the URL of the link href

		Liferay.Util.openModal({
			bodyHTML: Liferay.Language.get('changing-tab-without-save-helper'),
			buttons: [
				{
					autoFocus: true,
					displayType: 'secondary',
					label: Liferay.Language.get('cancel'),
					type: 'cancel',
				},
				{
					displayType: 'secondary',
					label: Liferay.Language.get('discard'),
					onClick: () => {
						window.location.href = href;
					},
				},
				{
					displayType: 'warning',
					label: Liferay.Language.get('save-and-continue'),
					onClick: () => {
						saveButton.dispatchEvent(new Event('click'));
						window.location.href = href;
					},
				},
			],
			status: 'warning',
			title: Liferay.Language.get('discard-changes') + '?',
		});
	}

	return (
		<ClayCheckbox
			checked={checked}
			indeterminate={indeterminate}
			inline
			onChange={() => {
				setChecked((prevCheckedState) => !prevCheckedState);

				if (checked == initialChecked) {
					count.value = Number(count.value) - 1;
				}
				else {
					count.value = Number(count.value) + 1;
				}

				if (indeterminate) {
					setIndeterminate(false);
					setValue('');
				}

				const permissionPropagationEnabledCheckbox = document.getElementById(
					_portletNamespace + 'permissionPropagationEnabled'
				);

				if (permissionPropagationEnabledCheckbox) {
					const alertMessage = document.getElementById(
						_portletNamespace + 'alertMessage'
					);

					if (
						alertMessage.classList.contains('hide') &&
						permissionPropagationEnabledCheckbox.checked
					) {
						alertMessage.classList.remove('hide');
					}
				}
			}}
			value={value}
			{...otherProps}
		/>
	);
}

PermissionsCheckbox.propTypes = {
	checked: PropTypes.bool,
	indeterminate: PropTypes.bool,
};
