/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayLink from '@clayui/link';
import ClayNavigationBar from '@clayui/navigation-bar';
import React from 'react';
export default function PermissionNavigationBar({
	navigationItems: _navigationItems,
	portletNamespace: _portletNamespace,
}) {
	const alertMessage = document.getElementById(
		_portletNamespace + 'alertMessage'
	);
	const saveButton = document.getElementById(
		_portletNamespace + 'saveButton'
	);
	function onChangeTab(event, href) {
		if (!alertMessage.classList.contains('hide')) {
			openPopUp(href);
		}
		else {
			window.location.href = href;
		}
	}
	function openPopUp(href) {
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
		<ClayNavigationBar
			triggerLabel={_navigationItems.find(({active}) => active)?.label}
		>
			{_navigationItems.map(({active, href, label}, index) => {
				return (
					<ClayNavigationBar.Item
						active={active}
						data-nav-item-index={index}
						key={label}
					>
						{href ? (
							<ClayLink
								onClick={(event) => onChangeTab(event, href)}
							>
								{label}
							</ClayLink>
						) : (
							<ClayButton>{label}</ClayButton>
						)}
					</ClayNavigationBar.Item>
				);
			})}
		</ClayNavigationBar>
	);
}
