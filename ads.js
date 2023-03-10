const gameInput = { gameName: 'DrawBridgePuzzle', publisherName: 'Weegoon', surface: 'test'};

$.getScript(

   
    "https://g.glance-cdn.com/public/content/games/xiaomi/gamesAd.js",
    
    "gpid.js"

)
    .done(function (script, textStatus) {
        console.log(textStatus);
        window.GlanceGamingAdInterface.setupLibrary(gameInput, successCb, failCb);
    })
    .fail(function (jqxhr, settings, exception) {
        console.log("MLIB load failed, reason : ", exception);
    });


var LPBannerInstance, LBBannerInstance, StickyBannerInstance, replayInstance, GlanceGamingAdInstance, rewardInstance ,_triggerReason;
var interstitialInstance;
var is_replay_noFill = false
var is_rewarded_noFill = false
var isRewardGranted = false
var isRewardedAdClosedByUser = false

const LPMercObj = {
    adUnitName: "Weegoon_DrawBridgePuzzle",
    pageName: 'DrawBridgePuzzle',               //Game Name
    categoryName: 'google',           //Publisher Name
    placementName: 'Test_Banner',
    containerID: "div-gpt-ad-2",            //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
const StickyObj = {
    adUnitName: "Weegoon_DrawBridgePuzzle",
    pageName:'DrawBridgePuzzle',                        //Game Name
    categoryName: 'google',                   //Publisher Name       
    placementName: 'Test_Banner',
    containerID: "banner-ad",            //Div Id for banner
    height: 50,
    width: 320,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

const LBBannerObj = {
    adUnitName: "Weegoon_DrawBridgePuzzle",
    pageName: 'DrawBridgePuzzle',               //Game Name
    categoryName: 'google',           //Publisher Name
    placementName: 'Test_Banner',
    containerID: "div-gpt-ad-1",            //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

function successCb() {
    console.log("set up lib success")
    // showBumperAd();

}
function failCb(reason) { }



const replayObj = {
    adUnitName: "Weegoon_DrawBridgePuzzle",
    placementName: "Test_Rewarded",
    pageName: 'DrawBridgePuzzle',
    categoryName: 'google',
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}
const rewardObj = {
    adUnitName: "Weegoon_DrawBridgePuzzle",
    placementName: "Test_Rewarded",
    pageName: 'DrawBridgePuzzle',
    categoryName: 'google',
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}


function bannerCallbacks(obj) {
    
   
    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded CALLBACK', data);

        if (obj.adUnitName === LBBannerObj.adUnitName ) {
            $("#div-gpt-ad-1").css("display", "flex")
            $(".gameOverDiv").css("margin-top", "0px");
        }
    });

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed  CALLBACK', data);


        if (obj.adUnitName === LBBannerObj.adUnitName ) {
            $("#div-gpt-ad-1").css("display", "none")
            $(".gameOverDiv").css("margin-top", "100px");

        }
    });

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed  CALLBACK', data);
    });

   
}






function rewardedCallbacks(obj) {
   
   

    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded Rewarded CALLBACK', data);
        if (obj.adUnitName === replayObj.adUnitName) {
            is_replay_noFill = false
        }
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = false
        }


    });

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed Rewarded CALLBACK', data);
        if (obj.adUnitName ===replayObj.adUnitName) {
            is_replay_noFill = true
        }
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = true
        }


    });

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed Rewarded CALLBACK', data);


    });

   

    obj.adInstance?.registerCallback('onAdClosed', (data) => {
        console.log('onAdClosed Rewarded CALLBACK', data);
    
        if (obj.adUnitName == rewardObj.adUnitName) {
            isRewardedAdClosedByUser = true
        }
        runOnAdClosed();
        isRewardGranted = false
        isRewardedAdClosedByUser = false
    

      
    });

    obj.adInstance?.registerCallback('onAdClicked', (data) => {
        console.log('onAdClicked Rewarded CALLBACK', data);
    });

    obj.adInstance?.registerCallback('onRewardsUnlocked', (data) => {
        console.log('onRewardsUnlocked Rewarded CALLBACK', data);
        
        if (obj.adUnitName === rewardObj.adUnitName) {
            isRewardGranted = true
        }

    });

}

function runOnAdClosed() {
    console.log('reward close 0 ', _triggerReason);
    if (_triggerReason === 'replay') {

    // call function for replay
    _triggerReason = ''
    $('#playMore').css("display", "none");
    
    replayInstance = window.GlanceGamingAdInterface.loadRewardedAd(replayObj, rewardedCallbacks);

    } else if (_triggerReason === 'reward') {
        console.log("reward close 1");

        rewardInstance.destroyAd();
      // If user close ad before reward
      if (!isRewardGranted && isRewardedAdClosedByUser) {
        // call function for not earning reward (failure case)
     
      } else {

    // call function for earned reward  (success case)
      myGameInstance.SendMessage('ShowAds', 'OnRewardAdsClosed');
      }
      _triggerReason = ''
      rewardInstance = window.GlanceGamingAdInterface.loadRewardedAd(rewardObj, rewardedCallbacks);

    } 


  }


  function replayEvent() { 
    _triggerReason = 'replay'
    if(!is_replay_noFill){
        window.GlanceGamingAdInterface.showRewarededAd(replayInstance);        
    }else{
        runOnAdClosed();
    }
  
    // LBBannerInstance.destroyAd();
    
    $("#div-gpt-ad-1").html("");
    
  
}

function interstitialEvent(){
    window.GlanceGamingAdInterface.showInterstitialAd(replayInstance);
}

function rewardEvent() {
    // _triggerReason = 'reward'
    // if (!is_rewarded_noFill) {
    //     window.GlanceGamingAdInterface.showRewarededAd(rewardInstance);
    // } else {
    //     runOnAdClosed();
    // }

}



function showGame() {
    if (recUI === 'true') {
        window.PwaGameCenterInterface.hideRecommendedSection();
        showcanvas();
    }

    else {
        $('#playMore').css("display", "none");
        LBBannerInstance.destroyAd();
        $("#div-gpt-ad-1").html("");
    }
}

