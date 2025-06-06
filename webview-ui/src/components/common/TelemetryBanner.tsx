import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { memo, useState } from "react"
import styled from "styled-components"
import { vscode } from "../../utils/vscode"
import { TelemetrySetting } from "../../../../src/shared/TelemetrySetting"
import { useAppTranslation } from "../../i18n/TranslationContext"

const BannerContainer = styled.div`
	background-color: var(--vscode-banner-background);
	padding: 12px 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex-shrink: 0;
	margin-bottom: 6px;
`

const ButtonContainer = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	& > vscode-button {
		flex: 1;
	}
`

const TelemetryBanner = () => {
	const { t } = useAppTranslation()
	const [hasChosen, setHasChosen] = useState(false)

	const handleAllow = () => {
		setHasChosen(true)
		vscode.postMessage({ type: "telemetrySetting", text: "enabled" satisfies TelemetrySetting })
	}

	const handleDeny = () => {
		setHasChosen(true)
		vscode.postMessage({ type: "telemetrySetting", text: "disabled" satisfies TelemetrySetting })
	}

	const handleOpenSettings = () => {
		window.postMessage({ type: "action", action: "settingsButtonClicked" })
	}

	return (
		<BannerContainer>
			<div>
				<strong>{t("common:telemetryTitle")}</strong>
				<div className="mt-1">
					{t("common:anonymousTelemetry")}
					<div className="mt-1">
						{t("common:changeSettings")}{" "}
						<VSCodeLink href="#" onClick={handleOpenSettings}>
							{t("common:settings")}
						</VSCodeLink>
						.
					</div>
				</div>
			</div>
			<ButtonContainer>
				<VSCodeButton appearance="primary" onClick={handleAllow} disabled={hasChosen}>
					{t("common:allow")}
				</VSCodeButton>
				<VSCodeButton appearance="secondary" onClick={handleDeny} disabled={hasChosen}>
					{t("common:deny")}
				</VSCodeButton>
			</ButtonContainer>
		</BannerContainer>
	)
}

export default memo(TelemetryBanner)
