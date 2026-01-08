import { supabase } from "./supabase.js";

/**
 * 테이블 스키마 정보 조회
 */
export async function getTableSchema(tableName: string = "marathons") {
  try {
    // PostgreSQL 정보 스키마를 통해 테이블 구조 조회
    const { data, error } = await supabase.rpc("get_table_columns", {
      table_name: tableName,
    });

    if (error) {
      // RPC 함수가 없을 경우 직접 쿼리 시도
      return await getTableSchemaDirect(tableName);
    }

    return data;
  } catch {
    return await getTableSchemaDirect(tableName);
  }
}

/**
 * 직접 쿼리로 테이블 스키마 조회
 */
async function getTableSchemaDirect(tableName: string) {
  try {
    // 샘플 데이터를 조회하여 구조 파악
    const { data, error } = await supabase.from(tableName).select("*").limit(1);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      // 데이터가 없으면 TypeScript 인터페이스 기반으로 구조 반환
      return getSchemaFromInterface();
    }

    // 실제 데이터의 첫 번째 레코드로 구조 파악
    const sample = data[0];
    const columns = Object.keys(sample).map((key) => {
      const value = sample[key];
      return {
        column_name: key,
        data_type: getDataType(value),
        is_nullable: value === null ? "YES" : "NO",
        default_value: null,
        sample_value: value,
      };
    });

    return {
      table_name: tableName,
      columns,
      record_count: await getRecordCount(tableName),
    };
  } catch (error) {
    console.error("Error getting table schema:", error);
    // 에러 발생 시 인터페이스 기반 구조 반환
    return getSchemaFromInterface();
  }
}

/**
 * 레코드 수 조회
 */
async function getRecordCount(tableName: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  } catch {
    return 0;
  }
}

/**
 * 값의 타입으로부터 데이터 타입 추론
 */
function getDataType(value: unknown): string {
  if (value === null) return "NULL";
  if (Array.isArray(value)) return "ARRAY";
  if (typeof value === "object") return "JSONB";
  if (typeof value === "number") {
    // 정수인지 소수인지 확인
    return Number.isInteger(value) ? "BIGINT" : "NUMERIC";
  }
  if (typeof value === "boolean") return "BOOLEAN";
  if (typeof value === "string") {
    // 날짜 형식 체크
    if (value.match(/\d{4}년/)) return "TEXT (DATE)";
    return "TEXT";
  }
  return "UNKNOWN";
}

/**
 * TypeScript 인터페이스 기반 스키마 정보
 */
function getSchemaFromInterface() {
  return {
    table_name: "marathons",
    columns: [
      {
        column_name: "id",
        data_type: "BIGSERIAL",
        is_nullable: "NO",
        description: "Primary key",
      },
      {
        column_name: "name",
        data_type: "TEXT",
        is_nullable: "NO",
        description: "마라톤 이름",
      },
      {
        column_name: "date",
        data_type: "TEXT",
        is_nullable: "NO",
        description: '마라톤 날짜 (예: "2024년 3월 17일")',
      },
      {
        column_name: "location",
        data_type: "TEXT",
        is_nullable: "NO",
        description: "위치 (도시)",
      },
      {
        column_name: "country",
        data_type: "TEXT",
        is_nullable: "NO",
        description: "국가",
      },
      {
        column_name: "type",
        data_type: "TEXT",
        is_nullable: "NO",
        description: '타입: "domestic" | "international"',
        check_constraint: "type IN ('domestic', 'international')",
      },
      {
        column_name: "distances",
        data_type: "TEXT[]",
        is_nullable: "NO",
        description: '거리 배열 (예: ["풀코스", "하프", "10km"])',
      },
      {
        column_name: "participants",
        data_type: "TEXT",
        is_nullable: "NO",
        description: '참가자 수 (예: "30,000명")',
      },
      {
        column_name: "difficulty",
        data_type: "TEXT",
        is_nullable: "NO",
        description: '난이도: "easy" | "medium" | "hard"',
        check_constraint: "difficulty IN ('easy', 'medium', 'hard')",
      },
      {
        column_name: "weather",
        data_type: "JSONB",
        is_nullable: "NO",
        description: "날씨 정보 (condition, temperature, description)",
      },
      {
        column_name: "scenery",
        data_type: "TEXT",
        is_nullable: "NO",
        description: "풍경 설명",
      },
      {
        column_name: "price",
        data_type: "TEXT",
        is_nullable: "NO",
        description: '참가비 (예: "50,000원")',
      },
      {
        column_name: "details",
        data_type: "JSONB",
        is_nullable: "NO",
        description:
          "상세 정보 (courseDescription, elevation, services, deadline, website, startTime, parking)",
      },
      {
        column_name: "created_at",
        data_type: "TIMESTAMPTZ",
        is_nullable: "YES",
        description: "생성일시",
        default_value: "NOW()",
      },
      {
        column_name: "updated_at",
        data_type: "TIMESTAMPTZ",
        is_nullable: "YES",
        description: "수정일시",
        default_value: "NOW()",
      },
    ],
  };
}

/**
 * 테이블 정보 요약
 */
export async function getTableInfo(tableName: string = "marathons") {
  try {
    const schema = await getTableSchemaDirect(tableName);
    const recordCount = await getRecordCount(tableName);

    return {
      table_name: tableName,
      exists: true,
      record_count: recordCount,
      schema: schema.columns || schema,
      last_checked: new Date().toISOString(),
    };
  } catch (error) {
    return {
      table_name: tableName,
      exists: false,
      error: error instanceof Error ? error.message : "Unknown error",
      schema: getSchemaFromInterface(),
    };
  }
}
