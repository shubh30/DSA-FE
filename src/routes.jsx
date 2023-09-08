import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import Layout from "./components/Layout";

function Routes() {
  const lastActiveIndexString = localStorage.getItem('lastActiveIndex')
  const lastActiveIndex = Number(lastActiveIndexString)
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || 0)
  const [pageData, setPageData] = useState({})
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <Layout {...props} activeIndex={activeIndex} setActiveIndex={setActiveIndex} pageData={pageData} setPageData={setPageData}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/marketing" />
              </Route>
              <Route path='/marketing' exact render={(props) => <DetailPage {...props} activeIndex={activeIndex} setActiveIndex={setActiveIndex} pageData={pageData} setPageData={setPageData} />} />
              <Route path='/finance' render={(props) => <DetailPage {...props} activeIndex={activeIndex} setActiveIndex={setActiveIndex} pageData={pageData} setPageData={setPageData} />} />
              <Route path='/personnel' render={(props) => <DetailPage {...props} activeIndex={activeIndex} setActiveIndex={setActiveIndex} pageData={pageData} setPageData={setPageData} />} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        )}
      />
    </BrowserRouter>
  );
}

export default Routes;
