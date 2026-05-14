import { fetchData } from "@/lib/fetch-data";
import ClientLoader from "./ClientLoader";
import FacebookPixel from "./FacebookPixel";
import { GTM } from "./GTM";
import MicrosoftClarity from "./MicrosoftClarity";
import ScriptLoader from "../elements/ScriptLoader";
import ViewHTML from "../elements/ViewHTML";
import GoogleAdsense from "./GoogleAdsense";
const ServerDataProvider = async () => {
  const [settingsRes, translationRes] = await Promise.allSettled([
    fetchData({ api: `info/basic` }),
    fetchData({ api: `translations` }),
  ]);

  const settings =
    settingsRes.status === "fulfilled" ? settingsRes.value?.data || {} : {};
  const translations =
    translationRes.status === "fulfilled"
      ? translationRes.value?.data || {}
      : {};

  const FB_PIXEL_ID =
    settings?.fb_pixel_id || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  const GOOGLE_ADSENSE_VERIFICATION_ID = settings?.google_adsense_verification;

  const GTM_ID = settings?.gtm_id;

  const MS_CLARITY_ID =
    settings?.ms_clarity_id || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  const headerScript = settings?.custom_script?.header_custom_script || null;
  const footerScript = settings?.custom_script?.footer_custom_script || null;

  return (
    <>
      {/* Loading setting for client uses */}
      <ClientLoader
        settings={settings}
        translations={translations}
        // locale={locale}
      />
      {FB_PIXEL_ID && <FacebookPixel fbPixelId={FB_PIXEL_ID} />}

      {GTM_ID && <GTM gtmId={GTM_ID} />}

      {MS_CLARITY_ID && <MicrosoftClarity msClarityId={MS_CLARITY_ID} />}

      {GOOGLE_ADSENSE_VERIFICATION_ID && (
        <GoogleAdsense verificationId={GOOGLE_ADSENSE_VERIFICATION_ID} />
      )}

      <ScriptLoader scriptId={"header-script"} scriptBody={headerScript} />
      <ViewHTML htmlText={footerScript} />
    </>
  );
};

export default ServerDataProvider;
