module.exports = (verifyUrl, domain) => `
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
  <tr>
    <td align="center">
      <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">
        <tr>
          <td align="center">
            <div style="font-family:sans-serif;text-align:left;width:465px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
                <tr>
                  <td align="center">
                    <div><img src="https://i.imgur.com/QamFpQe.png" width="40" height="37" alt="ZEIT" /></div>
                    <h1 style="font-family:sans-serif;color:#000;font-size:24px;font-weight:normal;margin:30px 0;padding:0;">Verify your email to log on to <b>${domain}</b></h1>
                  </td>
                </tr>
              </table>
              <br/>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
                <tr>
                  <td align="center">
                    <div>
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${verifyUrl}" style="height:50px;width:200px;v-text-anchor:middle;" arcsize="10%" stroke="f" fillcolor="#000">
                        <w:anchorlock/>
                        <center>
                          <![endif]-->
                          <a href="${verifyUrl}" target="_blank" style="background-color:#001bff;border-radius:5px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;font-weight:500;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none">Verify</a>
                          <!--[if mso]>
                        </center>
                      </v:roundrect>
                      <![endif]-->
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
