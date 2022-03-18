window.app_saku3_transaksi_yakes_inves_fObliRekonJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fObliRekonJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fObliRekonJual";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Rekon Penjualan Obligasi Utk Pembelian", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,450], childPage:["Daftar Obligasi","Data Obligasi","Data Penjualan","Summary"]});
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,520,this.pc1.height-10],colCount:3,tag:9,
					colTitle:["Status","Kode","Nama MI"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		            colTitle:["Kode MI","ID","Seri","Tanggal","Nominal Beli"],
					colWidth:[[4,3,2,1,0],[120,100,100,100,100]],					
					colFormat:[[4],[cfNilai]],
					readOnly:true,			
					autoPaging:true,rowPerPage:20, 		
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		this.bLoad = new portalui_button(this.sgn,{bound:[860,1,100,18],caption:"Load Beli",click:[this,"doLoad"]});		

		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,
					colTitle:["Kode MI","ID Beli","Seri","Tanggal","Price","Nominal Jual"],
					colWidth:[[5,4,3,2,1,0],[120,100,100,100,100,100]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					//autoPaging:true,rowPerPage:20, 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		
		this.bRekon = new portalui_button(this.sgn1,{bound:[860,1,100,18],caption:"Rekon Jual",click:[this,"doHitung"]});		
		
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					colTitle:["Kode MI","Seri","Nominal","Terjual","Sisa"],
					colWidth:[[4,3,2,1,0],[100,100,100,100,100]],					
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					readOnly:true,			
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});	

		this.rearrangeChild(10, 23);
		this.bCopyData = new portalui_button(this.pc1.childPage[0],{bound:[530,10,100,18],caption:"Copy Upload",click:[this,"doCopy"]});		
		this.bLihat = new portalui_button(this.pc1.childPage[0],{bound:[530,45,100,18],caption:"Lihat Hasil",click:[this,"doHasil"]});		

		setTipeButton(tbSimpan);		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			var data = this.dbLib.getDataProvider(
				"select a.kode_rdkelola,a.nama "+
				"from inv_rdkelola a "+
				"where a.flag_aktif='2' "+
				"order by a.kode_rdkelola ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					var vStatus = "NON";
					this.sg2.appendData([vStatus,line.kode_rdkelola,line.nama]);
				}
			} else this.sg2.clear(1);	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fObliRekonJual.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fObliRekonJual.implement({
	doHasil: function(){
		var koderd = ""; 
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
				koderd += ",'"+this.sg2.cells(1,i)+"'";
			}			
		}
		koderd = koderd.substr(1);			
		if (koderd == "") koderd = "''";
		
		var strSQL = 	"select a.*,isnull(b.jual,0) as jual,a.nilai-isnull(b.jual,0) as saldo "+
						"from "+
						"(	"+					 
							"select kode_rdkelola,kode_jenis,sum(nilai)  as nilai "+
							"from inv_obli_d "+
							"group by kode_rdkelola,kode_jenis "+
						") a "+
						
						"left join "+
						"("+
							"select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  "+
							"from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual "+
							"group by b.kode_rdkelola,a.kode_jenis "+
						") b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis "+

						"where a.kode_rdkelola in ("+koderd+") ";
						
						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;		
			this.sg3.clear();			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];	
				this.sg3.appendData([line.kode_rdkelola,line.kode_jenis,floatToNilai(line.nilai),floatToNilai(line.jual),floatToNilai(line.saldo)]);						
			}
		} else this.sg3.clear(1);
		
	},
	doCopy: function() {
		//mencopy data dari zz_obli (rawdata) ke inv_obli_d		
		this.pesan= 0;
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();

		var koderd = ""; 
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
				koderd += ",'"+this.sg2.cells(1,i)+"'";
			}			
		}
		koderd = koderd.substr(1);			
		if (koderd == "") koderd = "''";

		sql.add("delete from inv_obli_d where kode_rdkelola in ("+koderd+") ");
		sql.add("insert into inv_obli_d ( "+
				"no_beli,kode_lokasi,kode_jenis,status,nilai,nilai_beli,nilai_piukupon,tgl_mulai,tgl_selesai,jml_hari,tgl_akru,tgl_akru_seb,rate,basis,nilai_buku,tgl_akru_kupon,tgl_akru_kupon_seb,no_cair_piukupon,no_oblijual,pph,kode_broker,p_price,kode_rdkelola,no_pindahsts,kode_plan "+
				") "+
			
				"select a.idref,'99',a.ibpa,'TRADING',a.nominal,a.nominal * a.p_price/100,0,a.tanggal,b.tgl_selesai,datediff(day,a.tanggal,b.tgl_selesai) as jml_hari,b.tgl_selesai,b.tgl_selesai,b.persen as rate, "+
				"case c.jenis when 'PEMERINTAH' then 364 else 360 end as basis,a.nominal,b.tgl_selesai,b.tgl_selesai,'X','X',0,'-',a.p_price,a.kode_rd,'-','1'  "+
				"from zz_obli a "+ 
				"inner join inv_oblijenis b on a.ibpa=b.kode_jenis "+
				"inner join inv_obligor c on b.kode_obligor=c.kode_obligor "+
				"where a.jenis='B' and a.sts_jt='X' and a.kode_rd in ("+koderd+") ");
		this.dbLib.execArraySQL(sql);				
	},
	doDoubleClick: function(sender,col,row) {		
		if (sender == this.sg2) {
			if (col == 0 ) {
				if (sender.cells(0,row) == "NON") sender.cells(0,row,"PROSES"); 
				else sender.cells(0,row,"NON"); 
			}
		}
	},
	doLoadJual: function(sender,totalRow){
		try {
			var koderd = ""; 
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
					koderd += ",'"+this.sg2.cells(1,i)+"'";
				}			
			}
			koderd = koderd.substr(1);			
			if (koderd == "") koderd = "''";
			
			var strSQL = "select  kode_rd,tanggal as tgljual,ibpa,p_price,sum(nominal) as njual "+
						 "from zz_obli where jenis='S' and kode_rd in ("+koderd+") and sts_jt='X' "+
						 "group by  kode_rd,tanggal,ibpa,p_price order by kode_rd,ibpa,tanggal";								

			var data1 = this.dbLib.getDataProvider(strSQL,true);				
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU1 = data1;												
			} else this.sg1.clear(1);	
											
		} catch(e) {alert(e);}
	},		
	doHitung:	function(sender){				
		try {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].terjual = 0;				
			}
			this.sg1.clear();
			this.doLoadJual();

			for (var i=0; i < this.dataJU1.rs.rows.length;i++){
				var nilaiBayar = parseFloat(this.dataJU1.rs.rows[i].njual);								
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (this.dataJU1.rs.rows[i].kode_rd == this.dataJU.rs.rows[j].kode_rdkelola && this.dataJU1.rs.rows[i].ibpa == this.dataJU.rs.rows[j].kode_jenis) {
						var sisa = (parseFloat(this.dataJU.rs.rows[j].nilai)-parseFloat(this.dataJU.rs.rows[j].terjual));
						if (nilaiBayar >= sisa && sisa > 0) {							
							nilaiBayar = nilaiBayar - sisa;							
							this.sg1.appendData([this.dataJU.rs.rows[j].kode_rdkelola,this.dataJU.rs.rows[j].no_beli,this.dataJU.rs.rows[j].kode_jenis,this.dataJU1.rs.rows[i].tgljual,floatToNilai(this.dataJU1.rs.rows[i].p_price),floatToNilai(sisa)]);							
							this.dataJU.rs.rows[j].terjual += sisa;
						}
						else {
							if (nilaiBayar < sisa && sisa > 0) {
								if (nilaiBayar !=0 ) {
									this.dataJU.rs.rows[j].terjual += nilaiBayar;
									this.sg1.appendData([this.dataJU.rs.rows[j].kode_rdkelola,this.dataJU.rs.rows[j].no_beli,this.dataJU.rs.rows[j].kode_jenis,this.dataJU1.rs.rows[i].tgljual,floatToNilai(this.dataJU1.rs.rows[i].p_price),floatToNilai(nilaiBayar)]);
									nilaiBayar = 0;							
									break;
								}
							}
						}																							
					}
				}							
			}	
			this.pc1.setActivePage(this.pc1.childPage[2]);						
		}
		catch(e) {
			alert(e);
		}
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
			this.pesan= 1;		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var koderd = ""; 
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
							koderd += ",'"+this.sg2.cells(1,i)+"'";
						}			
					}
					koderd = koderd.substr(1);			
					if (koderd == "") koderd = "''";
					
					sql.add("delete from  inv_oblijual_m where kode_rdkelola in ("+koderd+") ");
					sql.add("delete from  inv_oblijual_d where kode_broker in ("+koderd+") ");

					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(5,i)!="0") {
							var idjual = this.sg1.cells(1,i) + "/" +i.toString();
							var hjual = Math.round(nilaiToFloat(this.sg1.cells(4,i)) / 100 * nilaiToFloat(this.sg1.cells(5,i)));

							sql.add("insert into inv_oblijual_d (no_oblijual,kode_plan,kode_jenis,no_beli,n_oleh,n_buku,n_piukupon,n_jual,gainlos,n_kupon,tgl_kupon,p_price,p_price2,dpp,pajak,kode_broker) values "+
					  				"('"+idjual+"','1','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(1,i)+"',"+nilaiToFloat(this.sg1.cells(5,i))+",0,0,"+hjual+",0,0,'"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+",0,0,0,'"+this.sg1.cells(0,i)+"')");
						}
					}
					
					sql.add("insert into inv_oblijual_m(no_oblijual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_jenis,akun_piutang,akun_piukupon,kode_plan,tgl_settl,kode_rdkelola, tgl_kuponakhir,jmlhari,n_piukupon,pajak_kupon,nominal,persen_jual,gainlos,pajak_gl, total) "+
							"select no_oblijual,'"+this.app._lokasi+"',substring(convert(varchar,tgl_kupon,112),1,6),tgl_kupon,'mr',getdate(),'X','X','X','X','X','X',kode_jenis,'X','X','1',tgl_kupon,kode_broker, tgl_kupon,0,0,0,n_oleh,p_price,0,0, n_jual "+
							"from inv_oblijual_d where kode_broker in ("+koderd+")");

					sql.add("delete from  inv_oblibeli_m where kode_rdkelola in ("+koderd+") ");
					sql.add("insert into inv_oblibeli_m (no_beli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,no_dokumen,keterangan,kode_pp,kode_drk,kode_obligor,kode_rdkelola,kode_plan,tgl_settl,market) "+
							"select no_beli,'"+this.app._lokasi+"',substring(convert(varchar,tgl_mulai,112),1,6) as periode,tgl_mulai,'mr',getdate(),'X','X','X','X', "+
							"'X','X','994000','X','X',kode_rdkelola,'1',tgl_mulai,'SEKUNDER'  "+
							"from inv_obli_d  where kode_rdkelola in ("+koderd+")");					
					

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg1.clear();
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;							
		}
	},
	doLoad: function(sender){			
		var koderd = ""; 
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
				koderd += ",'"+this.sg2.cells(1,i)+"'";
			}			
		}
		koderd = koderd.substr(1);			
		if (koderd == "") koderd = "''";
		
		var strSQL = "select *,0 as terjual from inv_obli_d where kode_rdkelola in ("+koderd+") order by kode_rdkelola,kode_jenis,tgl_mulai";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];				
			}		
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);

			this.pc1.setActivePage(this.pc1.childPage[1]);	
		} else this.sg.clear(1);	
		
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_rdkelola,line.no_beli,line.kode_jenis,line.tgl_mulai.substr(0,10),floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){		
							if (this.pesan== 1)	{				
								// this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							}
							else system.info(this,"Copy Data Upload sudah selesai","");							
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.doHasil();
		} catch(e) {
			alert(e);
		}
	}
});