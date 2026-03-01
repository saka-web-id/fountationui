<script>
export default {
  methods: {
    buttonNext(currentFieldsetId, nextFieldsetId) {
      document.getElementById(currentFieldsetId).style.display = 'none';
      document.getElementById(nextFieldsetId).style.display = 'block';

      //Add Class Active
      $("#progressMSForm li").eq(parseInt(nextFieldsetId.match(/\d+(\.\d+)?/g))).addClass("active");

    }, buttonPreviously(currentFieldsetId, previousFieldsetId) {
      document.getElementById(currentFieldsetId).style.display = 'none';
      document.getElementById(previousFieldsetId).style.display = 'block';

      //Remove class active
      $("#progressMSForm li").eq(parseInt(currentFieldsetId.match(/\d+(\.\d+)?/g))).removeClass("active");
    }
  }
}
</script>

<template>
  <section class="py-4">
    <div class="container">
      <ol class="breadcrumb ms-4 me-4">
        <li class="breadcrumb-item"><router-link to="/dashboard"><span>Home</span></router-link></li>
        <li class="breadcrumb-item"><a href="#"><span>Profile</span></a></li>
        <li class="breadcrumb-item active"><span>My Profile 2FA Authentication</span></li>
      </ol>

      <div class="card ms-2 me-2 bg-gradient-dark">
        <div class="card-body ms-2 ps-0 me-2 pe-0">
          <div class="p-lg-4 ps-0 pe-0 py-3">
            <div class="row gy-4 gy-md-0 mx-auto">
              <div class="col-12 col-md-6 col-lg-5 col-xxl-4 ms-0 ps-0 pe-1">
                <h5 class="text-start ms-2">Sakawijaya</h5>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail">Email :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail" value="sakawijaya@gmail.com"></div>
                <div class="mb-0 form-floating"><label class="form-label" for="idinputemail-1">Phone :</label><input class="mt-0 pt-4 mb-0 form-control-plaintext" type="email" id="idinputemail-1" value="08158224448"></div>
                <ul class="nav nav-pills flex-column ms-2 me-2 mt-2 pt-0">
                  <li class="nav-item mt-2 mb-0"><router-link to="/profileinformation" class="nav-link text-center" style="background: #2f3337;">Personal Information</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profilepassword" class="nav-link text-center" style="background: #2f3337;">Change Password</router-link></li>
                  <li class="nav-item mt-2"><router-link to="/profile2fa" class="nav-link text-center active">2FA Authentification</router-link></li>
                </ul>
              </div>
              <div class="col">
                <div class="card mb-3 bg-gradient-dark">
                  <div class="card-body ms-0 ps-0 me-0 pe-0 mt-0 pt-0 pb-0"></div>
                  <div class="text-center py-4" id="idform">
                    <h4 class="text-start ms-2">2FA Authentification</h4><small class="text-start d-block ms-2" style="color: var(--bs-secondary);">Update your 2 Factor Authentication</small>
                    <div class="card" style="background: rgba(23,26,29,0);">
                      <div class="ps-2 pe-2 row">
                        <div style="background: rgba(21,22,23,0);">
                          <form id="msform">
                            <ul class="list-inline" id="progressMSForm">
                              <li class="list-inline-item active" id="account" style="color: var(--bs-light);">2FA</li>
                              <li class="list-inline-item" id="personal">Scan</li>
                              <li class="list-inline-item" id="confirm">Complete</li>
                            </ul>
                            <fieldset id="fieldset0" class="form-card" style="background: rgba(255,255,255,0);">
                              <div class="mt-2 form-card" style="background: rgba(255,255,255,0);">
                                <h4 style="text-align: left;">Personal 2FA</h4>
                                <div>
                                  <div class="d-inline-flex mt-4 input-group input-group-sm"><span class="bg-opacity-10 me-10 pe-10">Phone</span><input class="form-control" type="tel"></div>
                                </div>
                                <div>
                                  <div class="d-inline-flex mt-4 input-group input-group-sm"><span class="bg-opacity-10 ms-0 me-10 pe-10">2FA Channel</span><select class="form-select ps-0 pe-0" style="padding: 0px 8px 8px;margin: 2px 0px 25px;width: 528px;"></select></div>
                                </div>
                              </div>
                              <button class="btn btn-primary btn-sm mt-2 next" @click="buttonNext('fieldset0', 'fieldset1')" type="button" name="next">Next</button>
                            </fieldset>
                            <fieldset id="fieldset1"  class="form-card" style="background: rgba(255,255,255,0);">
                              <div class="text-center mt-2 form-card" style="background: rgba(255,255,255,0);">
                                <legend class="text-center" style="text-align: left;">Scan QR</legend><img class="img-fluid" width="68" height="68" src="/src/assets/img/design-a-pretty-qr-code.png">
                              </div>
                              <button class="btn btn-primary btn-sm me-1 mt-2 previous" @click="buttonPreviously('fieldset1', 'fieldset0')" type="button" name="previous" style="border-color: var(--bs-secondary);background: var(--bs-secondary);">Previous</button>
                              <button class="btn btn-primary btn-sm ms-1 mt-2 next" @click="buttonNext('fieldset1', 'fieldset2')" type="button" name="next">Next</button>
                            </fieldset>
                            <fieldset id="fieldset2"  class="form-card" style="background: rgba(255,255,255,0);">
                              <div class="text-center mt-2 form-card" style="background: rgba(255,255,255,0);">
                                <legend class="text-center" style="text-align: left;">Completed</legend><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-patch-check" style="font-size: 63px;color: var(--bs-primary);">
                                <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"></path>
                              </svg>
                              </div>
                            </fieldset>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </section>
</template>

<style scoped>

</style>