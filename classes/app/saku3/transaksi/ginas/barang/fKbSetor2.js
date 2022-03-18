window.app_saku3_transaksi_ginas_barang_fKbSetor2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ginas_barang_fKbSetor2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ginas_barang_fKbSetor2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Setoran Penjualan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]], readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Jenis",items:["BM"], readOnly:true,tag:2,change:[this,"doChange"],visible:false});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,300,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,500,20],caption:"Deskripsi", maxLength:150});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Transaksi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Akun Piutang", maxLength:10, tag:2});							
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"NIK Setor", multiSelection:false, maxLength:10, tag:2});							
		this.cb_terima = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"NIK Terima", multiSelection:false, maxLength:10, tag:2});							
        this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Nilai Setoran", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
        this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[650,17,80,18],caption:"Load Data",click:[this,"doLoadData"]});


        this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,18,990,190], childPage:["Data Closing Penjualan"]});			
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:0,
		            colTitle:["Status","No Closing","Total","Tgl Closing"],					
					colWidth:[[3,2,1,0],[80,120,120,100]],
                    readOnly:true,colFormat:[[2],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
                    picklist:[[0],[new portalui_arrayMap({items:["TIDAK","SETOR"]})]],
                    change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],
                    autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_terima.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PIUSTR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PIUSTR") this.cb_titip.setText(line.flag);
				}
			}

			this.cb_terima.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ginas_barang_fKbSetor2.extend(window.childForm);
window.app_saku3_transaksi_ginas_barang_fKbSetor2.implement({	
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
			if (this.stsSimpan == 1) this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
                        sql.add("delete from brg_setor_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                        
                        sql.add("update brg_jualpiu_d set no_str='-' where no_str='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','JUALSETOR','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'"+this.cb_nik.getText()+"','"+this.cb_terima.getText()+"','-','-','-','-','"+this.cb_akun.getText()+"','"+this.cb_titip.getText()+"','-')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','JUALSETOR','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_titip.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.e_ket.getText()+"','JUALSETOR','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					sql.add("insert into brg_setor_d (no_bukti,kode_lokasi,periode,tgl_setor,nik_setor,nik_terima,dc,keterangan,akun_kas,akun_titip,nilai,no_ref1) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_nik.getText()+"','"+this.cb_terima.getText()+"','D','"+this.e_ket.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_titip.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'-')");	
                    
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "SETOR"){
							sql.add("update brg_jualpiu_d set no_str='"+this.e_nb.getText()+"' where no_close='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
						}
					}				

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
					this.sg3.clear(1); 
					this.doClick();
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";														
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Setoran tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					 system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}		
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("delete from brg_setor_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
                    sql.add("update brg_jualpiu_d set no_str='-' where no_str='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);						
		if (this.stsSimpan == 1) this.doClick();				
    },						
    doLoadData:function(sender){		
        this.sg1.clear(1);
        var strSQL =  "select 'TIDAK' as status,a.no_close,sum(a.nilai) as total,b.tanggal "+
		"from brg_jualpiu_d a "+
		"inner join trans_m b on a.no_close=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
        "where a.no_close <> '-' and isnull(a.no_str,'-')='-'  and a.kode_lokasi='"+this.app._lokasi+"' "+
		"group by a.no_close,b.tanggal order by b.tanggal ";
		
		// alert(strSQL);

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();				
			this.doTampilData(1);
		} else this.sg1.clear(1);	
        
	},
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;		
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);	
		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			if(line.status.toUpperCase() == "SETOR"){
				tot = tot + parseFloat(line.total);
			}   										
			this.sg1.appendData([line.status.toUpperCase(),line.no_close,floatToNilai(line.total),line.tanggal]);
		}
		this.e_total.setText(floatToNilai(tot));
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
    doChangeCells: function(sender, col , row) {
		if (col == 0) {
            this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg1.cells(0,row);
			var tot =0;
			var line = "";
            for (var i=0;i<this.dataJU.rs.rows.length;i++){
                line = this.dataJU.rs.rows[i];	
                if(line.status.toUpperCase() == "SETOR"){
                    tot = tot + parseFloat(line.total);
                }                							
            }

            this.e_total.setText(floatToNilai(tot));
           
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_produk_rptBayarJual";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc2.show();   
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
			this.sg3.clear(1); 
			this.doClick();			
			this.pc2.setActivePage(this.pc2.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select distinct a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
					 "from trans_m a "+
					 "left join (select distinct no_setor from brg_jualbayar_d where kode_lokasi='"+this.app._lokasi+"') b on a.no_bukti=b.no_setor  "+
					 "where b.no_setor is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'JUALSETOR' and a.posted ='F' order by a.no_bukti";
        var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
        this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,nilaiToFloat(line.nilai1),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																						
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;							
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.*,b.tgl_setor from trans_m a inner join brg_setor_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);						
						this.dp_d2.setText(line.tgl_setor);						
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.param1);				
						this.cb_titip.setText(line.param2);				
						this.cb_nik.setText(line.nik1);										
						this.cb_terima.setText(line.nik2);										
						this.e_total.setText(floatToNilai(line.nilai1));						
					}
                }	
                
                var strSQL =  "select a.no_close,sum(a.nilai) as total,b.tanggal "+
				"from brg_jualpiu_d a "+
				"inner join trans_m b on a.no_close=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
                "where a.no_str='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
                "group by a.no_close,b.tanggal ";

                var data = this.dbLib.getDataProvider(strSQL,true);
                
                if (typeof data == "object" && data.rs.rows[0] != undefined){
                    var tot=0;
                    for (var i=0;i<data.rs.rows.length;i++){
                        line = data.rs.rows[i];												
                        this.sg1.appendData(["SETOR",line.no_close,nilaiToFloat(line.total),line.tanggal]); 
                        tot = tot + parseFloat(line.total);
                    }
                    this.e_total.setText(floatToNilai(tot));
                
                } else this.sg1.clear(1);		
			}						
		} catch(e) {alert(e);}
	}
});