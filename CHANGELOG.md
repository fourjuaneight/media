# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### Bug Fixes

- [Change tag variable names to camelcase.](https://github.com/fourjuaneight/media/commit/f3869244103351ddb1201a80f14c7b8429ca19ed)
- [Add dynamic data extraction from hasura query.](https://github.com/fourjuaneight/media/commit/fc41350a078476794c83518e6ffaef34d6ae7260)
- [Throw as string on error to pass message to response.](https://github.com/fourjuaneight/media/commit/b1d0a7533a06f3fadf168491b559e9fcc14eec39)
- [Update media fields to match table names.](https://github.com/fourjuaneight/media/commit/4791988c708275eea33e1c52b7bafad4ca81639a)
- [Sort query response by correct column name.](https://github.com/fourjuaneight/media/commit/8ac0695a0b7a8176cfe06232393d458bb86f198f)
- [Return on successful mutation.](https://github.com/fourjuaneight/media/commit/a19d9098b7c21c64543fbf9c6e0be8d285bd47b0)
- [Minor typing updates.](https://github.com/fourjuaneight/media/commit/192c2cbf195a1fca41c422e89074abf548bc8675)
- [Return correct prop on mutations.](https://github.com/fourjuaneight/media/commit/332679f6ca9eace73f146a2ba098857198d1b7b7)
- [Update insert mutation response body.](https://github.com/fourjuaneight/media/commit/047d314db0b4fca01680ba75ebfef77f69c84d8a)

### Features

- [Add typings.](https://github.com/fourjuaneight/media/commit/90f4d8c3cc7a09328cab9f677996c07cd043d7ae)
- [Add tags for classification.](https://github.com/fourjuaneight/media/commit/04d746e87ee8eda4f42a8cd7746f834e8f3f8932)
- [Add base request handler.](https://github.com/fourjuaneight/media/commit/63b58650b62a909e2bac79ca203c2da554c39548)
- [Add hasura util methods to data access and manupulation.](https://github.com/fourjuaneight/media/commit/87c4fd1829db805a5944e2cee34fa325fd59f0fd)
- [Add custom handler to determine query or mutaiton type.](https://github.com/fourjuaneight/media/commit/43e32a673f5ee08a8e810782000f6dfcad1eb27b)
- [Add workflow to build and publish worker.](https://github.com/fourjuaneight/media/commit/2e925cd31e725a171ca9a811eaf184ab32d63733)
- [Forward requests if an exception is thrown during execution.](https://github.com/fourjuaneight/media/commit/24cb1f301fa4d9320ec6562b1b885e227c084e3b)
- [Sort query columns by desired order.](https://github.com/fourjuaneight/media/commit/98e88b09071ae266567dfe3319757adc351f37cc)
- [Recieve auth key as header.](https://github.com/fourjuaneight/media/commit/83a10e5827bc54dd48234f454680280a104a6bbc)
- [Add hasura tags query in place of static list.](https://github.com/fourjuaneight/media/commit/dfa52dc2b50b46c45ad2cd92e326addcea5deb45)
- [Add id column to queries.](https://github.com/fourjuaneight/media/commit/484ac4a0cdcde823d7d114bb68d86bf73dfa1cec)
- [Order genres query by name ascending.](https://github.com/fourjuaneight/media/commit/6cfee9d7cbcfc3f3657f33c3076f283372c78c46)
- [Add query for table column aggregate count.](https://github.com/fourjuaneight/media/commit/e465be2558103167288f9897d5a0212654144580)
- [Add changelog generation action.](https://github.com/fourjuaneight/media/commit/54e993002759d0ec82f225aaf8ff42d7d42c6831)

### Miscellaneous Tasks

- [Add dev container config.](https://github.com/fourjuaneight/media/commit/3389bc7cfcd2d6b776fd46487cb4e9d3b9275efa)
- [Add description, licence, and changelog config.](https://github.com/fourjuaneight/media/commit/bdcc93ea8c6141512bb049f4befe9e7c8828dfe6)
- [Add node version and dependencies.](https://github.com/fourjuaneight/media/commit/f53df146640f4b80d3dd81774811fd90ba6d2749)
- [Add linter and formatter configs.](https://github.com/fourjuaneight/media/commit/094fec9bbb9245b77f2d533c5bf8f4fbf90b4927)
- [Add worker and typescript configs.](https://github.com/fourjuaneight/media/commit/c1aa242d5532a3422b7d1855062e711caf9f80bf)
- [Add git ignore.](https://github.com/fourjuaneight/media/commit/72e8d460fc286f9af3da382e9c464f07304aaafb)
- [Update typings with more concise responses.](https://github.com/fourjuaneight/media/commit/1b026a636965cd978d397c05a7f205dfa4f30a63)
- [Minor dependency updates.](https://github.com/fourjuaneight/media/commit/4688bd295d266749fdd0dceed72440de09a41df2)
- [Add logging on errors.](https://github.com/fourjuaneight/media/commit/3dd3049508aff62fce2278b4d173c7f5101183f6)
- [Add inline error logging on hasura requests.](https://github.com/fourjuaneight/media/commit/20f981be838031f0ffee3f56b0a35c36d48d19ee)
- [More logging for debugging.](https://github.com/fourjuaneight/media/commit/702a01996b11eb424ac2231fa0dc14199e1c3be2)
- [Log query response to determine error.](https://github.com/fourjuaneight/media/commit/7cc44881d3686ac4b6b360565cbe3c25273955aa)
- [Further logging for debugging.](https://github.com/fourjuaneight/media/commit/7f914c4ff46e4ad3de1c8a1b74db4a10f0dae6c4)
- [More logging to narrow down error.](https://github.com/fourjuaneight/media/commit/48f9a0b9df9ed0bca61144320ae34cf6b98ff492)
- [Rename movies and shows genre tag list.](https://github.com/fourjuaneight/media/commit/c283e892ab0a6d71fb8f18d6c2b7f5d1f4ea6dc1)
- [Add logging for mutaiton debugging.](https://github.com/fourjuaneight/media/commit/3a47f9f0a2527b167cb98d55153629bb909f305e)
- [Return mutation results.](https://github.com/fourjuaneight/media/commit/102bfe4afa9bf7e4b99b939bb9406c2cf2294b67)
- [Remove debugging logs.](https://github.com/fourjuaneight/media/commit/8a82fc6389cd8814eb242d883103d1a17f11506c)
- [Minor syntax corrections.](https://github.com/fourjuaneight/media/commit/a4946442e5e58be8b319771238befafe4f955d7a)
- [Install dependencies on separate step for caching.](https://github.com/fourjuaneight/media/commit/26bce08393bb31836411f255657662fe757b88a5)
- [Check for existing media item before adding new.](https://github.com/fourjuaneight/media/commit/1b4eae7adc46d8375c7cda32e421f8f75a496a07)
- [Add logs for debugging.](https://github.com/fourjuaneight/media/commit/291447ab58e8f0b389cb271ee5bb8fb6b70979fa)
- [Better query error logging.](https://github.com/fourjuaneight/media/commit/6aa9ebd7f2a51d00166a2f6b76a21624613051f3)
- [Logging optimizations.](https://github.com/fourjuaneight/media/commit/2501328436c23536dd2ce94959ff541021b56b89)
- [Minor syntax updates.](https://github.com/fourjuaneight/media/commit/481976edc2836867b86fe3a2a3ab0f545f1623b4)

<!-- generated by git-cliff -->
