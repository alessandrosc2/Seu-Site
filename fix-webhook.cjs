const fs = require('fs');

let content = fs.readFileSync('api/webhook.ts', 'utf8');

const replacement = `
          // Verificar Idempotência no Firestore usando REST API
          // Vamos tentar criar o documento com currentDocument.exists = false
          // Se falhar (409 Conflict), já foi processado.
          const orderDocUrl = \`https://firestore.googleapis.com/v1/projects/\${FIREBASE_PROJECT_ID}/databases/(default)/documents/orders/\${id}?key=\${FIREBASE_API_KEY}\`;
          
          const createOrderRes = await fetch(orderDocUrl + '&currentDocument.exists=false', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: {
                payment_id: { stringValue: id.toString() },
                email: { stringValue: email },
                amount: { doubleValue: payment.transaction_amount || 0 },
                status: { stringValue: 'approved' },
                createdAt: { timestampValue: new Date().toISOString() }
              }
            })
          });

          if (createOrderRes.status === 409) {
            console.log(\`Order \${id} já processada. Ignorando.\`);
            return res.status(200).json({ success: true, message: 'Idempotent - already processed' });
          }

          if (!createOrderRes.ok) {
            console.error('Falha ao salvar order no Firestore:', await createOrderRes.text());
            // Continua assim mesmo para liberar o acesso, mas loga o erro
          }

          // 1. Cria o usuário no Firebase com uma senha aleatória`;

const regex = /\/\/ Verificar Idempotência no Firestore usando REST API[\s\S]*?\/\/ 1\. Cria o usuário no Firebase com uma senha aleatória/;
content = content.replace(regex, replacement.trim());

const replacement2 = `
          if (signUpData.error && signUpData.error.message === 'EMAIL_EXISTS') {
            console.log("Usuário já existe. Continuaremos com a liberação de senha.");
          }

          // 2. Envia o email de "Redefinição de Senha" do próprio Firebase`;

const regex2 = /if \(signUpData\.error && signUpData\.error\.message === 'EMAIL_EXISTS'\) \{[\s\S]*?\/\/ 2\. Envia o email de "Redefinição de Senha" do próprio Firebase/;
content = content.replace(regex2, replacement2.trim());

fs.writeFileSync('api/webhook.ts', content, 'utf8');
