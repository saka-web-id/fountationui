<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { aiChatService } from '~/services/cognitive/aiChatService';
import { aiProviderService } from '~/services/cognitive/aiProviderService';
import { aiSessionService } from '~/services/cognitive/aiSessionService';
import { aiMessageService } from '~/services/cognitive/aiMessageService';
import type { AiMessageDTO, AiSessionDTO } from '~/types/cognitive';
import type { AiProviderDTO } from '~/types/registry';
import { Offcanvas } from 'bootstrap';

// const { t } = useI18n();
const authStore = useAuthStore();
const messages = ref<AiMessageDTO[]>([]);
const newMessage = ref('');
const isLoading = ref(false);
const isLoadingHistory = ref(false);
const isLoadingMore = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

// Session state
const sessions = ref<AiSessionDTO[]>([]);
const selectedSession = ref<AiSessionDTO | null>(null);
const newSessionTitle = ref('');
const sessionOffcanvasElement = ref<HTMLElement | null>(null);
const sessionOffcanvas = ref<Offcanvas | null>(null);

// Pagination state
const messagePage = ref(0);
const hasMoreMessages = ref(false);

// Provider state
const providers = ref<AiProviderDTO[]>([]);
const selectedProvider = ref<AiProviderDTO | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    const targetScroll = chatContainer.value.scrollHeight;
    chatContainer.value.scrollTop = targetScroll;
    
    // Fallback for slower rendering or images
    setTimeout(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }, 50);
    setTimeout(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }, 200);
  }
};

const fetchMessageHistory = async (isLoadMore = false) => {
  if (!authStore.user || !authStore.user.company.companyId || !selectedSession.value) return;

  if (isLoadMore) {
    isLoadingMore.value = true;
    messagePage.value++;
  } else {
    isLoadingHistory.value = true;
    messagePage.value = 0;
    messages.value = [];
  }

  try {
    const response = await aiMessageService.getMessages(
      authStore.user.company.companyId,
      authStore.user.id,
      {
        sessionId: selectedSession.value.aiSessionId,
        page: messagePage.value,
        size: 100
      }
    );

    const newMessages = response.data.aiMessageData;
    // API already returns messages in correct order (Oldest -> Newest)
    // No need to reverse.

    if (isLoadMore) {
      // Prepend older messages
      const currentScrollHeight = chatContainer.value?.scrollHeight || 0;
      messages.value = [...newMessages, ...messages.value];
      
      // Maintain scroll position after prepending older messages
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - currentScrollHeight;
      }
    } else {
      messages.value = newMessages;
      await scrollToBottom();
    }

    hasMoreMessages.value = (messagePage.value + 1) * 100 < response.data.aiMessageTotalItems;
  } catch (error) {
    console.error('Failed to fetch message history', error);
  } finally {
    isLoadingHistory.value = false;
    isLoadingMore.value = false;
  }
};

const fetchSessions = async () => {
  if (authStore.user && authStore.user.company.companyId) {
    try {
      const response = await aiSessionService.getSessions(authStore.user.company.companyId, authStore.user.id, { size: 50 });
      sessions.value = response.data.aiSessionData;
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  }
};

const openSessionOffcanvas = () => {
  if (sessionOffcanvasElement.value && !sessionOffcanvas.value) {
    sessionOffcanvas.value = new Offcanvas(sessionOffcanvasElement.value);
  }
  sessionOffcanvas.value?.show();
};

const selectSession = (session: AiSessionDTO) => {
  selectedSession.value = session;
  fetchMessageHistory();
  sessionOffcanvas.value?.hide();
};

const createNewSession = async () => {
  if (!newSessionTitle.value.trim() || !authStore.user || !authStore.user.company.companyId) return;

  try {
    const response = await aiSessionService.createSession(authStore.user.company.companyId, authStore.user.id, {
      aiSessionTitle: newSessionTitle.value
    });
    const newSession = response.data;
    sessions.value.unshift(newSession);
    selectedSession.value = newSession;
    newSessionTitle.value = '';
    messages.value = [];
    sessionOffcanvas.value?.hide();
  } catch (error) {
    console.error('Failed to create session', error);
  }
};

onMounted(async () => {
  if (authStore.user && authStore.user.company.companyId) {
    // Parallel fetch
    await Promise.all([
      fetchSessions(),
      aiProviderService.getAiProviders(authStore.user.company.companyId, authStore.user.id, { size: 10 }).then(res => {
        providers.value = res.data.aiProviderData;
        if (providers.value.length > 0) {
          selectedProvider.value = providers.value[0];
        }
      })
    ]);

    // If no session selected, open the offcanvas
    if (!selectedSession.value) {
      openSessionOffcanvas();
    }
  }
});

const sendMessage = async () => {
  if (!newMessage.value.trim() || !authStore.user || !authStore.user.company.companyId || !selectedProvider.value || !selectedSession.value || isLoading.value) return;

  const prompt = newMessage.value;
  newMessage.value = '';
  
  // Add user message to UI
  const userMsg: AiMessageDTO = {
    aiMessageId: Date.now(),
    aiMessageSessionId: selectedSession.value.aiSessionId!,
    aiMessageRole: 'user',
    aiMessageContent: prompt,
    aiMessageTokensUsed: 0,
    aiMessageCreatedAt: new Date().toISOString()
  };
  messages.value.push(userMsg);
  await scrollToBottom();

  isLoading.value = true;
  
  let assistantMsg: AiMessageDTO | null = null;

  await aiChatService.streamChat(
    authStore.user.company.companyId,
    authStore.user.id,
    selectedSession.value.aiSessionId!,
    {
      prompt: prompt,
      providerName: selectedProvider.value.aiProviderName
    },
    (chunk) => {
      if (!assistantMsg) {
        assistantMsg = { ...chunk };
        if (assistantMsg.aiMessageId === null) {
            assistantMsg.aiMessageId = Date.now() + 1;
        }
        messages.value.push(assistantMsg);
      } else {
        if (chunk.aiMessageId === null) {
            assistantMsg.aiMessageContent += chunk.aiMessageContent;
            const index = messages.value.findIndex(m => m.aiMessageId === assistantMsg?.aiMessageId);
            if (index !== -1) {
                messages.value[index] = { ...assistantMsg };
            }
        } else {
            const index = messages.value.findIndex(m => m.aiMessageId === chunk.aiMessageId);
            if (index !== -1) {
                messages.value[index] = chunk;
                assistantMsg = chunk;
            } else if (chunk.aiMessageRole === 'assistant') {
                messages.value.push(chunk);
                assistantMsg = chunk;
            }
        }
      }
      scrollToBottom();
    },
    (error) => {
      console.error('Chat error', error);
      isLoading.value = false;
    },
    () => {
      isLoading.value = false;
      scrollToBottom();
    }
  );
};

const formatTime = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};
</script>

<template>
  <section class="py-4">
    <div class="container d-flex flex-column align-items-center">
      <div class="w-100" style="max-width: 900px;">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <router-link to="/dashboard" class="text-decoration-none text-muted">
              <i class="fa fa-home me-1"></i> Home
            </router-link>
          </li>
          <li class="breadcrumb-item active text-light opacity-75">AI Chat Dashboard</li>
        </ol>

        <div class="card shadow-lg border-0 rounded-4 bg-dark overflow-hidden" style="background-color: #1e1e2d !important; color: #fff;">
          <div class="card-header bg-transparent border-bottom border-secondary border-opacity-25 p-2 p-md-3">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
              <div class="d-flex align-items-center w-100 w-md-auto justify-content-between justify-content-md-start">
                <h5 class="mb-0 me-3 fs-6 fs-md-5 text-nowrap">AI Assistant</h5>
                <button @click="openSessionOffcanvas" class="btn btn-sm btn-outline-secondary rounded-pill px-2 px-md-3 text-truncate" style="max-width: 150px; max-width: md-250px;">
                  <i class="fa fa-comments me-1"></i> {{ selectedSession ? selectedSession.aiSessionTitle : 'Select Session' }}
                </button>
              </div>
              <div class="d-flex align-items-center w-100 w-md-auto">
                <div v-if="providers.length > 0" class="d-flex align-items-center w-100 w-md-auto">
                  <span class="small text-muted me-2 d-none d-lg-inline text-nowrap">Provider:</span>
                  <select v-model="selectedProvider" class="form-select form-select-sm bg-dark text-light border-secondary border-opacity-50 flex-grow-1" style="width: auto; min-width: 120px;">
                    <option v-for="provider in providers" :key="provider.aiProviderId" :value="provider">
                      {{ provider.aiProviderName }} - {{ provider.aiProviderChatModel }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div ref="chatContainer" class="card-body p-3 p-md-4 d-flex flex-column overflow-auto chat-container" style="height: calc(100vh - 320px); min-height: 350px;">
            
            <div v-if="!selectedSession" class="d-flex flex-column align-items-center justify-content-center h-100 opacity-50">
              <i class="fa fa-comments fa-4x mb-3"></i>
              <p>Please select or create a session to start chatting.</p>
              <button @click="openSessionOffcanvas" class="btn btn-primary mt-3">Manage Sessions</button>
            </div>

            <div v-else-if="isLoadingHistory" class="d-flex flex-column align-items-center justify-content-center h-100 opacity-50">
              <div class="spinner-border text-primary mb-3" role="status"></div>
              <p>Loading chat history...</p>
            </div>

            <div v-else-if="messages.length === 0" class="d-flex flex-column align-items-center justify-content-center h-100 opacity-50">
              <i class="fa fa-robot fa-4x mb-3"></i>
              <p>How can I help you in "{{ selectedSession.aiSessionTitle }}"?</p>
            </div>

            <template v-else>
              <!-- Read More Button -->
              <div v-if="hasMoreMessages" class="d-flex justify-content-center mb-4 mt-2">
                <button 
                  @click="fetchMessageHistory(true)" 
                  class="btn btn-sm btn-link text-decoration-none text-muted opacity-75"
                  :disabled="isLoadingMore"
                >
                  <i class="fa fa-history me-1" v-if="!isLoadingMore"></i>
                  <span class="spinner-border spinner-border-sm me-1" v-else></span>
                  {{ isLoadingMore ? 'Loading...' : 'Read More' }}
                </button>
              </div>

              <template v-for="(msg, index) in messages" :key="msg.aiMessageId || index">
                <!-- Assistant Message -->
                <div v-if="msg.aiMessageRole === 'assistant'" class="d-flex flex-row justify-content-start mb-4">
                  <div class="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center shadow-sm align-self-start mt-1" width="45" height="45" style="min-width: 45px; min-height: 45px;">
                    <i class="fa fa-robot text-white"></i>
                  </div>
                  <div style="max-width: 75%;">
                    <div class="p-3 bg-secondary bg-opacity-25 rounded-4 mb-1" style="border-top-left-radius: 4px !important;">
                      <p class="small mb-0" style="line-height: 1.5; white-space: pre-wrap;">{{ msg.aiMessageContent }}</p>
                    </div>
                    <p class="small text-muted mb-0 ms-1 opacity-75">
                      {{ msg.aiMessageCreatedAt ? formatTime(msg.aiMessageCreatedAt) + ' | ' + formatDate(msg.aiMessageCreatedAt) : 'Streaming...' }}
                    </p>
                  </div>
                </div>

                <!-- User Message -->
                <div v-else class="d-flex flex-row justify-content-end mb-4">
                  <div class="text-end" style="max-width: 75%;">
                    <div class="p-3 text-white rounded-4 mb-1" style="background-color: #0d6efd; border-top-right-radius: 4px !important;">
                      <p class="small mb-0" style="line-height: 1.5;">{{ msg.aiMessageContent }}</p>
                    </div>
                    <p class="small text-muted mb-0 me-1 opacity-75">{{ formatTime(msg.aiMessageCreatedAt) }} | {{ formatDate(msg.aiMessageCreatedAt) }}</p>
                  </div>
                  <div class="bg-secondary rounded-circle ms-3 d-flex align-items-center justify-content-center shadow-sm align-self-start mt-1" width="45" height="45" style="min-width: 45px; min-height: 45px;">
                    <i class="fa fa-user text-white"></i>
                  </div>
                </div>
              </template>
            </template>

            <div v-if="isLoading && (!messages.length || messages[messages.length-1].aiMessageRole !== 'assistant')" class="d-flex flex-row justify-content-start mb-4">
                <div class="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center shadow-sm align-self-start mt-1" width="45" height="45" style="min-width: 45px; min-height: 45px;">
                  <i class="fa fa-robot text-white"></i>
                </div>
                <div class="p-3 bg-secondary bg-opacity-25 rounded-4 mb-1 d-flex align-items-center" style="border-top-left-radius: 4px !important;">
                  <div class="spinner-grow spinner-grow-sm text-light opacity-50 me-1" role="status"></div>
                  <div class="spinner-grow spinner-grow-sm text-light opacity-50 me-1" role="status"></div>
                  <div class="spinner-grow spinner-grow-sm text-light opacity-50" role="status"></div>
                </div>
            </div>

          </div>

          <!-- Chat Input -->
          <div class="card-footer bg-transparent border-top border-secondary border-opacity-25 p-3">
            <div class="d-flex align-items-center">
              <div class="input-group border border-secondary border-opacity-50 rounded-pill overflow-hidden flex-nowrap shadow-sm transition-focus" style="background-color: #151521 !important;">
                <input 
                  type="text" 
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  class="form-control bg-transparent text-light border-0 shadow-none px-4 py-3" 
                  :placeholder="selectedSession ? 'Type your message...' : 'Select a session to start chatting'" 
                  :disabled="isLoading || !selectedSession"
                />
                <button class="btn border-0 text-muted px-3 hover-text-primary d-flex align-items-center" type="button" :disabled="!selectedSession">
                  <i class="fa fa-paperclip"></i>
                </button>
                <button 
                  @click="sendMessage"
                  class="btn border-0 text-primary px-4 hover-text-primary-dark d-flex align-items-center" 
                  type="button"
                  :disabled="isLoading || !newMessage.trim() || !selectedSession"
                >
                  <i class="fa fa-paper-plane" v-if="!isLoading"></i>
                  <span class="spinner-border spinner-border-sm" v-else></span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Session Offcanvas -->
    <div ref="sessionOffcanvasElement" class="offcanvas offcanvas-start bg-dark text-white border-end border-secondary" tabindex="-1" id="sessionOffcanvas">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title"><i class="fa fa-comments me-2 text-primary"></i> Chat Sessions</h5>
        <button type="button" class="btn-close btn-close-white" @click="sessionOffcanvas?.hide()"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        
        <!-- Create New Session -->
        <div class="mb-4">
          <label class="form-label small text-muted text-uppercase fw-bold">Create New Session</label>
          <div class="mb-2">
            <input 
              type="text" 
              v-model="newSessionTitle" 
              class="form-control bg-transparent border-secondary text-white mb-2" 
              placeholder="Session title..." 
            />
            <div v-if="providers.length > 0" class="mb-2">
              <label class="form-label small text-muted">Initial Provider</label>
              <select v-model="selectedProvider" class="form-select bg-dark text-white border-secondary">
                <option v-for="provider in providers" :key="provider.aiProviderId" :value="provider">
                  {{ provider.aiProviderName }} - {{ provider.aiProviderChatModel }}
                </option>
              </select>
            </div>
            <button @click="createNewSession" class="btn btn-primary w-100" type="button">
              <i class="fa fa-plus me-1"></i> Create Session
            </button>
          </div>
        </div>

        <!-- Session List -->
        <div class="flex-grow-1 overflow-auto">
          <label class="form-label small text-muted text-uppercase fw-bold mb-3">Recent Sessions</label>
          <div class="list-group list-group-flush">
            <button 
              v-for="session in sessions" 
              :key="session.aiSessionId"
              @click="selectSession(session)"
              class="list-group-item list-group-item-action bg-transparent text-white border-0 rounded-3 mb-2 p-3 transition-all d-flex justify-content-between align-items-center"
              :class="{ 'bg-primary bg-opacity-25 active': selectedSession?.aiSessionId === session.aiSessionId }"
            >
              <div class="text-truncate">
                <i class="fa fa-comment-alt me-3 opacity-50"></i>
                {{ session.aiSessionTitle }}
              </div>
              <small class="opacity-50 small" style="font-size: 0.7rem;">{{ formatDate(session.aiSessionCreatedAt!) }}</small>
            </button>
            <div v-if="sessions.length === 0" class="text-center py-5 opacity-50">
              <i class="fa fa-history fa-2x mb-2"></i>
              <p class="small">No sessions found</p>
            </div>
          </div>
        </div>
        
        <div class="mt-auto pt-3 border-top border-secondary opacity-50 small text-center">
          Powered by Foundation AI
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chat-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
  scroll-behavior: smooth;
}
.chat-container::-webkit-scrollbar {
  width: 6px;
}
.chat-container::-webkit-scrollbar-track {
  background: transparent;
}
.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}
.transition-focus:focus-within {
  border-color: #0d6efd !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
}
.hover-text-primary:hover i {
  color: #0d6efd !important;
  transition: color 0.2s ease-in-out;
}
.hover-text-primary-dark:hover i {
  color: #0a58ca !important;
  transition: color 0.2s ease-in-out;
}
input::placeholder {
  color: #6c757d !important;
  opacity: 1;
}
input:focus {
  outline: none;
}
.list-group-item-action:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  color: #fff !important;
}
.transition-all {
  transition: all 0.2s ease;
}
</style>