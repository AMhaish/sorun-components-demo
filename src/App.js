import React, { PureComponent } from "react";
import './App.css';
import Conversation from 'sorun-conversation';
import WebConversation from 'sorun-web-conversation';
import { StringExtentions } from "sorun-js";
import { SORUNJS_BROWSER_TYPES, SorunJsFactory } from "sorun-js";

const backend = "https://deneme.sorunapp.com/";
const token = "<Your token here>";
const company = 1;
const autoInit = true;
const language = "en";
const showHeader = true;

export default class App extends PureComponent{
  constructor(props) {
    super(props);
    //Adding string extentions to string prototype
    StringExtentions.init();
    this.state = {
      clientToken: undefined,
    }
    //#### Getting the client token should be happened in server side so we don't expos the agent token in Javascript code
    this.fetchClientToken(backend, 'FLOW_Test', token, (clientToken) => {
      if (clientToken) {
        //#### This part just in case of initializing Sorun-js outside (AutoInit = false)
        SorunJsFactory.initFactory(SORUNJS_BROWSER_TYPES, {
          props: {
            token: clientToken,
            company: company,
            api: backend,
          }
        });
        SorunJsFactory.getInstance().getParamsManager().setToken(clientToken);
        this.setState({ clientToken, core: SorunJsFactory.getInstance() });
      }
    });
    //####
  }

  render() {
    const { core, clientToken } = this.state;
    if (clientToken) {
      if (autoInit) {
        return (
          <Conversation
            language={language} // The interface language
            companyId={company} // The target company id
            Layout={WebConversation}
            showHeader={showHeader} // Show header or not
            autoInit={true}
            token={clientToken} // The token
            api={backend} // The backend
          />
        );
      } else {
        return (
          <Conversation
            core={core} // Core initialized outside
            language={language} // The interface language
            companyId={company} // The target company id
            Layout={WebConversation}
            showHeader={showHeader} // Show header or not
            autoInit={false} // Auto init will be false
          />
        );
      }
    } else {
      return <div>Loading ...</div>
    }
  }

  fetchClientToken(url, id, token, callback) {
    let urlParams = '';
    urlParams += 'phone=' + id.replace(/-/g, '').substring(0, 19) + '&';
    urlParams += 'token=' + token + '&';
    urlParams += 'name=FLOW_TESTER&';
    urlParams += 'surname=FLOW_TESTER&';
    urlParams += 'mail=tester@sorunflow.com&';
    fetch(url + "ClientToken?" + urlParams).then(res => {
      let status = parseInt(res.status);
      if (status === 200) {
        res.json().then(data => {
          if (data.content !== undefined && data.content.token !== undefined)
            if (callback) callback(data.content.token);
            else
              if (callback) callback();
        });
      } else
        if (callback) callback();
    }).catch(reason => {
      if (callback) callback();
    });
  }
}

