import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.\n' +
    'Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
}

/**
 * Supabase 클라이언트 (서버 사이드용)
 * Service Role Key를 사용하여 모든 권한으로 접근 가능
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Supabase 연결 테스트
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    // marathons 테이블이 있는지 확인
    const { data, error } = await supabase
      .from('marathons')
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.warn('⚠️  marathons 테이블이 아직 생성되지 않았습니다.');
        console.warn('   Supabase 대시보드에서 테이블을 생성하거나 SQL Editor에서 스크립트를 실행하세요.');
        return false;
      }
      console.error('❌ Supabase 연결 오류:', error.message);
      return false;
    }
    
    console.log('✅ Supabase 연결 성공');
    console.log(`   URL: ${supabaseUrl}`);
    if (data) {
      console.log(`   테이블 확인: marathons 테이블에 ${data.length}개 레코드 확인됨`);
    }
    return true;
  } catch (error) {
    console.error('❌ Supabase 연결 실패:', error);
    if (error instanceof Error) {
      console.error('   오류 메시지:', error.message);
    }
    return false;
  }
}

/**
 * 데이터베이스 상태 확인
 */
export async function checkDatabaseStatus() {
  try {
    const { data, error, count } = await supabase
      .from('marathons')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      return {
        connected: false,
        error: error.message,
        tableExists: false,
      };
    }
    
    return {
      connected: true,
      tableExists: true,
      recordCount: count || 0,
    };
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      tableExists: false,
    };
  }
}

