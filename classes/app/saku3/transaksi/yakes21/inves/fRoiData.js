window.app_saku3_transaksi_yakes21_inves_fRoiData = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fRoiData.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fRoiData";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Jurnal", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});	
		this.bLoad = new button(this,{bound:[250,12,80,18],caption:"Load Data",click:[this,"getData"]});					

		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Data Rekap Jurnal","Detail Jurnal"]});						
		this.sg3 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
				colTitle:["Jenis","Nilai","Penyesuaian","Nilai Akhir"],
				colWidth:[[3,2,1,0],[100,100,100,80]],	
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],									
				columnReadOnly:[true,[0,1,2,3],[]], //tidak ada adjust,,sudah bukan SAP lagi				
				change:[this,"doChangeCell3"],	
				autoAppend:false, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg3});		

		this.sg = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["Tanggal","Jenis","Nilai"],
				colWidth:[[2,1,0],[100,100,80]],	
				colFormat:[[2],[cfNilai]],	
				readOnly:true,								
				autoAppend:false, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg});		
		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		
			this.c_periode.items.clear();
			//var str = "select top 3 periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc";
			var str = "select top 12 periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fRoiData.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fRoiData.implement({
	//  SAP
	// getData: function() {	
	// 	var strSQL = "select 'SPI' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '00530%' and doc_no not like '17%' "+
					
	// 				 "union all "+
	// 				 "select 'PDPT' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '0041020%'  and doc_no not like '17%' "+

	// 				 "union all "+
	// 				 "select substring(glacc,3,8) as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "glacc in ('0051030102','0051030101','0051030103','0051030105') and doc_no not like '17%' "+
	// 				 "group by glacc "+
					 
	// 				 "union all "+
	// 				 "select 'CC' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "glacc in ('0061010201','0061010202','0061010203','0061010204') and doc_no not like '17%'  "+

	// 				 "union all "+
	// 				 "select 'OPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "substring(glacc,1,6) in ('005101','005102','005103','005104','005105','005106') and doc_no not like '17%' "+
					 
	// 				 "union all "+
	// 				 "select 'CAPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "substring(glacc,1,7) in( '0012010','0012020') and doc_type = 'WE' and doc_no not like '17%' "+

	// 				 "union all "+
	// 				 "select 'BKES' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "glacc like '005104%'  and doc_no not like '17%' "+

	// 				 "order by jenis ";

	// 	var data = this.dbLib.getDataProvider(strSQL,true);
	// 	if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 		var line;	
	// 		this.sg3.clear();							
	// 		for (var i in data.rs.rows){
	// 			line = data.rs.rows[i];						
	// 			this.sg3.appendData([line.jenis.toUpperCase(),floatToNilai(line.nilai),"0",floatToNilai(line.nilai)]);
	// 		}
	// 	} else this.sg3.clear(1);	


	// 	//--------
	// 	var strSQL = "select pstng_date,'SPI' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '00530%' and doc_no not like '17%' group by pstng_date "+
					
	// 				 "union all "+
	// 				 "select pstng_date,'PDPT' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '0041020%' and doc_no not like '17%' group by pstng_date "+

	// 				 "union all "+
	// 				 "select pstng_date,substring(glacc,3,8) as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "glacc in ('0051030102','0051030101','0051030103','0051030105')  and doc_no not like '17%' "+
	// 				 "group by glacc,pstng_date "+
					 
	// 				 "union all "+
	// 				 "select pstng_date,'CC' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "glacc in ('0061010201','0061010202','0061010203','0061010204') and doc_no not like '17%' group by pstng_date "+

	// 				 "union all "+
	// 				 "select pstng_date, 'OPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 //"where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 //"glacc like '0051%'  and doc_no not like '17%' group by pstng_date "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "substring(glacc,1,6) in ('005101','005102','005103','005104','005105','005106') and doc_no not like '17%' group by pstng_date "+
					 
					 
	// 				 "union all "+
	// 				 "select pstng_date, 'CAPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
	// 				 "substring(glacc,1,7) in( '0012010','0012020') and doc_type = 'WE' and doc_no not like '17%' group by pstng_date "+

	// 				 "union all "+
	// 				 "select pstng_date,'BKES' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
	// 				 "from exs_glitem "+
	// 				 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '005104%' and doc_no not like '17%' group by pstng_date "+

	// 				 "order by jenis ";

	// 	var data = this.dbLib.getDataProvider(strSQL,true);
	// 	if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 		var line;	
	// 		this.sg.clear();							
	// 		for (var i in data.rs.rows){
	// 			line = data.rs.rows[i];						
	// 			this.sg.appendData([line.pstng_date,line.jenis.toUpperCase(),floatToNilai(line.nilai)]);
	// 		}
	// 	} else this.sg.clear(1);	

	// },	

	getData: function() {	
		var strSQL = "select 'SPI' as jenis, sum(case when dc = 'C' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and kode_akun like '530%' "+
					
					 "union all "+
					 "select 'PDPT' as jenis, sum(case when dc = 'C' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and kode_akun like '41020%'  "+

					 "union all "+
					 "select kode_akun as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "kode_akun in ('51030102','51030101','51030103','51030105') "+
					 "group by kode_akun "+
					 
					 "union all "+
					 "select 'CC' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "kode_akun in ('61010201','61010202','61010203','61010204')  "+

					 "union all "+
					 "select 'OPEX' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "substring(kode_akun,1,4) in ('5101','5102','5103','5104','5105','5106') "+
					 
					 "union all "+
					 "select 'CAPEX' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "substring(kode_akun,1,5) in( '12010','12020') "+ //cek hanya pembelian fa

					 "union all "+
					 "select 'BKES' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where  periode = '"+this.c_periode.getText()+"' and "+
					 "kode_akun like '5104%'  "+

					 "order by jenis ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;	
			this.sg3.clear();							
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg3.appendData([line.jenis.toUpperCase(),floatToNilai(line.nilai),"0",floatToNilai(line.nilai)]);
			}
		} else this.sg3.clear(1);	


		//--------
		// var strSQL = "select pstng_date,'SPI' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '00530%' and doc_no not like '17%' group by pstng_date "+
					
		// 			 "union all "+
		// 			 "select pstng_date,'PDPT' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '0041020%' and doc_no not like '17%' group by pstng_date "+

		// 			 "union all "+
		// 			 "select pstng_date,substring(glacc,3,8) as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
		// 			 "glacc in ('0051030102','0051030101','0051030103','0051030105')  and doc_no not like '17%' "+
		// 			 "group by glacc,pstng_date "+
					 
		// 			 "union all "+
		// 			 "select pstng_date,'CC' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
		// 			 "glacc in ('0061010201','0061010202','0061010203','0061010204') and doc_no not like '17%' group by pstng_date "+

		// 			 "union all "+
		// 			 "select pstng_date, 'OPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 //"where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
		// 			 //"glacc like '0051%'  and doc_no not like '17%' group by pstng_date "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
		// 			 "substring(glacc,1,6) in ('005101','005102','005103','005104','005105','005106') and doc_no not like '17%' group by pstng_date "+
					 
					 
		// 			 "union all "+
		// 			 "select pstng_date, 'CAPEX' as jenis, sum(case when dc = 'S' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and "+
		// 			 "substring(glacc,1,7) in( '0012010','0012020') and doc_type = 'WE' and doc_no not like '17%' group by pstng_date "+

		// 			 "union all "+
		// 			 "select pstng_date,'BKES' as jenis, sum(case when dc = 'H' then local_amount else -local_amount end) as nilai "+
		// 			 "from exs_glitem "+
		// 			 "where substring(pstng_date,1,6) = '"+this.c_periode.getText()+"' and glacc like '005104%' and doc_no not like '17%' group by pstng_date "+

		// 			 "order by jenis ";


		var strSQL = "select tanggal,'SPI' as jenis, sum(case when dc = 'C' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and kode_akun like '530%' group by tanggal "+
					
					 "union all "+
					 "select tanggal,'PDPT' as jenis, sum(case when dc = 'C' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and kode_akun like '41020%' group by tanggal "+

					 "union all "+
					 "select tanggal,kode_akun as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "kode_akun in ('51030102','51030101','51030103','51030105')  "+
					 "group by kode_akun,tanggal "+
					 
					 "union all "+
					 "select tanggal,'CC' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "kode_akun in ('61010201','61010202','61010203','61010204') group by tanggal "+

					 "union all "+
					 "select tanggal, 'OPEX' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 
					 //"where periode = '"+this.c_periode.getText()+"' and "+
					 //"kode_akun like '51%'  group by periode "+

					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "substring(kode_akun,1,4) in ('5101','5102','5103','5104','5105','5106') group by tanggal "+
					 
					 
					 "union all "+
					 "select tanggal, 'CAPEX' as jenis, sum(case when dc = 'D' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and "+
					 "substring(kode_akun,1,5) in( '12010','12020') group by tanggal "+

					 "union all "+
					 "select tanggal,'BKES' as jenis, sum(case when dc = 'C' then nilai else -nilai end) as nilai "+
					 "from gldt "+
					 "where periode = '"+this.c_periode.getText()+"' and kode_akun like '5104%' group by tanggal "+

					 "order by jenis ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;	
			this.sg.clear();							
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData([line.tanggal,line.jenis.toUpperCase(),floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);	

	},	

	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	

					var strSQL = "select * from inv_beban_inves where tahun= '"+this.c_periode.getText().substr(0,4)+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line == undefined){			
							//master 2019																
							sql.add("insert into inv_beban_inves (kode_akun, tahun, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, jenis) "+
									"select kode_akun, '"+this.c_periode.getText().substr(0,4)+"', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, jenis "+
									"from inv_beban_inves where tahun = '2019' ");
						}						
					}				

					if (this.c_periode.getText().substr(4,2) == "01") sql.add("update inv_beban_inves set b1=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "02") sql.add("update inv_beban_inves set b2=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "03") sql.add("update inv_beban_inves set b3=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "04") sql.add("update inv_beban_inves set b4=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "05") sql.add("update inv_beban_inves set b5=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "06") sql.add("update inv_beban_inves set b6=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "07") sql.add("update inv_beban_inves set b7=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "08") sql.add("update inv_beban_inves set b8=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "09") sql.add("update inv_beban_inves set b9=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "10") sql.add("update inv_beban_inves set b10=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 					
					if (this.c_periode.getText().substr(4,2) == "11") sql.add("update inv_beban_inves set b11=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 
					if (this.c_periode.getText().substr(4,2) == "12") sql.add("update inv_beban_inves set b12=0 where tahun='"+this.c_periode.getText().substr(0,4)+"'");							 

					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)) {									
							if (this.c_periode.getText().substr(4,2) == "01") {
								sql.add("update inv_beban_inves set b1="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "02") {
								sql.add("update inv_beban_inves set b2="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "03") {
								sql.add("update inv_beban_inves set b3="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "04") {
								sql.add("update inv_beban_inves set b4="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "05") {
								sql.add("update inv_beban_inves set b5="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "06") {
								sql.add("update inv_beban_inves set b6="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "07") {
								sql.add("update inv_beban_inves set b7="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}							
							if (this.c_periode.getText().substr(4,2) == "08") {
								sql.add("update inv_beban_inves set b8="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "09") {
								sql.add("update inv_beban_inves set b9="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "10") {
								sql.add("update inv_beban_inves set b10="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "11") {
								sql.add("update inv_beban_inves set b11="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}
							if (this.c_periode.getText().substr(4,2) == "12") {
								sql.add("update inv_beban_inves set b12="+nilaiToFloat(this.sg3.cells(3,i))+" where kode_akun='"+this.sg3.cells(0,i)+"' and tahun='"+this.c_periode.getText().substr(0,4)+"'");
							}	
							
							//sudah gak pake SAP
							// if (nilaiToFloat(this.sg3.cells(2,i)) != 0) {									
							// 	//tanggal pertengahan diambil utk adjustmen
							// 	var tanggal = this.c_periode.getText().substr(0,4)+"-"+this.c_periode.getText().substr(4,2)+"-15";
							// 	var jenis = this.sg3.cells(0,i);
							// 	if (jenis == "51030101" || jenis == "51030102" || jenis == "51030103" || jenis == "51030105") jenis = "BINVES";

							// 	sql.add("insert into inv_cashout_tgl (periode,tanggal,kode_akun,jenis,nilai) values "+
							// 			"('"+this.c_periode.getText()+"','"+tanggal+"','"+this.sg3.cells(0,i)+"','"+jenis+"',"+nilaiToFloat(this.sg3.cells(2,i))+")");
							// }

						}	
					}

					sql.add("delete from inv_cashout_tgl where periode='"+this.c_periode.getText()+"'");
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {		
							var jenis = this.sg.cells(1,i);
							if (jenis == "51030101" || jenis == "51030102" || jenis == "51030103" || jenis == "51030105") jenis = "BINVES";

							sql.add("insert into inv_cashout_tgl (periode,tanggal,kode_akun,jenis,nilai) values "+
									"('"+this.c_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+jenis+"',"+nilaiToFloat(this.sg.cells(2,i))+")");
						}	
					}

					sql.add("exec sp_roi_kkp '"+this.c_periode.getText()+"'");
						
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_tab);
					this.sg.clear(1);
					this.sg3.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChangeCell3: function(sender, col, row){				
		if (col == 2) {
			if (nilaiToFloat(this.sg3.cells(2,row)) != 0 ) {
				var final = nilaiToFloat(this.sg3.cells(1,row)) + nilaiToFloat(this.sg3.cells(2,row));
				this.sg3.cells(3,row,final);										
			}						
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.c_periode.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});