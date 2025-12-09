---
title: "Centralized Traffic Engineering for Networked Farm Applications"
collection: publications
category: conferences
permalink: /publication/2025-06-01-farmnetes
excerpt: 'We design FarmNetes, a centralized traffic engineering (TE) system for wireless mesh networks that enables networked farm applications with commodity devices.'
date: 2025-06-01
venue: 'ACM/IEEE Symposium on Edge Computing (SEC)'
paperurl: 'https://doi.org/10.1145/3769102.3770615'
citation: 'Tahir, A., Li, Y., Jin, J., Moon, D., Zhang, C., Mihigo, A., Tariq, M. T., Vasisht, D., & Mittal, R. (2025). Centralized Traffic Engineering for Networked Farm Applications. <i>Proceedings of the Tenth ACM/IEEE Symposium on Edge Computing</i> (SEC &apos;25), Article 21. https://doi.org/10.1145/3769102.3770615'
---

Emerging farming techniques rely on smart devices such as multi-spectral cameras that collect fine-grained data, and tele-operated robots that perform tasks such as de-weeding, berry-picking, etc. These networked farm applications (requiring 10s of Mbps of throughput per device to the edge servers, with tens to hundreds of devices in a typical farm) must be supported on a wireless mesh network with limited capacity.

In this work, we use these networked farm applications as a compelling case-study to design FarmNetes, a centralized traffic engineering (TE) system for wireless mesh networks. FarmNetes leverages explicit control over farm workloads to make centralized TE decisions (temporal flow schedules, sending rates, load-aware routes, and channel configurations) from an edge server, so as to best meet task requirements. FarmNetes' centralized TE decisions enable it to work with commodity devices and control how the network is shared across flows based on the desired policies (prioritization and fairness) irrespective of the underlying MAC layer link sharing mechanisms. This further enables MAC-agnostic reasoning of wireless network behavior when making TE decisions.

Our evaluation, using testbeds in a farm and trace-driven simulations, shows how FarmNetes achieves 3× higher end-end network throughput and better meets application demands, compared to status-quo wireless mesh strategies.

