window.app_saku3_transaksi_produk_fKartuBDD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fKartuBDD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fKartuBDD";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu BDD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Kartu","No Bukti","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai Beban", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,370], childPage:["Data BDD","Schedule BDD"]});		
		this.cb_bukti = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"No BDD",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_perBDD = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Periode BDD", readOnly:true});
		this.cb_bdd = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun BDD",multiSelection:false, tag:1, readOnly:true, change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP / Unit",multiSelection:false, tag:1, readOnly:true});		
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,450,20],caption:"Keterangan", readOnly:true});
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai BDD", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});		
		this.cb_beban = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:1});				
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,30,200,20],caption:"Jk Waktu",tipeText:ttNilai, text:"0",change:[this,"doChange"]});

		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:0,
				colTitle:["Periode","Nilai Beban"],
				colWidth:[[1,0],[150,100]],
				columnReadOnly:[true,[0,1],[]],								
				colFormat:[[1],[cfNilai]],																
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);	
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;						
			this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.posted ='T' and a.kode_lokasi = '"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);						
	
			this.cb_beban.setSQL("select a.kode_akun,a.nama from masakun a "+
								 "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='034' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						
			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fKartuBDD.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fKartuBDD.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from bdd_m where no_bdd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from bdd_sch where no_bdd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into bdd_m (no_bdd,kode_lokasi,periode,nik_user,tgl_input,  tanggal,no_bukti,akun_bdd,akun_beban,nilai,keterangan,jk,kode_pp) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+thnBln+"','"+this.app._userLog+"',getdate(),  '"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_beban.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+
							this.e_ket.getText()+"',"+nilaiToFloat(this.e_lama.getText())+",'"+this.cb_pp.getText()+"')");
				
					var j = 0; 				  
					for (var i=0; i < this.sg.rows.getLength(); i++){
					  j = i+1;					
					  sql.add("insert into bdd_sch(no_bdd,kode_lokasi,nu,periode,nilai,no_beban) values "+
							  "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+",'-')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
				}
				break;
			
			case "simpan" :	
			case "ubah" :	this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from bdd_m where no_bdd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from bdd_sch where no_bdd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
				this.cb_bdd.setSQL("select a.kode_akun,a.nama from masakun a inner join trans_j b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.dc='D' "+
								   "where b.no_bukti='"+this.cb_bukti.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'",
								   ["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						
			
				var strSQL = "select periode from trans_m where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_perBDD.setText(line.periode);
					}
				}
			}
			if (sender == this.cb_bdd && this.cb_bukti.getText()!="" && this.cb_bdd.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select top 1 nilai,keterangan,kode_pp from trans_j where no_bukti = '"+this.cb_bukti.getText()+"' and kode_akun='"+this.cb_bdd.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
					}
				}
			}
			
			if (sender == this.e_nilai || sender == this.e_bunga || sender == this.e_lama) {
				if ((this.e_lama.getText() != "0") && (this.e_nilai.getText() != "0") && (this.e_lama.getText() != "") && (this.e_nilai.getText() != "")) 
					this.generateSch();	
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			var thnBln = this.dp_d1.getDateString().substr(2,2) + this.dp_d1.getDateString().substr(5,2);
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bdd_m","no_bdd",this.app._lokasi+"-BDD"+thnBln+".","0000"));
			this.dp_d1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   
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
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		var strSQL = "select distinct a.no_bdd,a.no_bukti,a.keterangan,a.nilai from bdd_m a "+
					 " left join ("+
					 "		select no_bdd from bdd_sch where kode_lokasi='"+this.app._lokasi+"' and no_beban<>'-' "+
					 ") b on a.no_bdd=b.no_bdd "+
					 "where b.no_bdd is null and a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_bdd,line.no_bukti,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * from bdd_m "+							 
							 "where no_bdd = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.cb_bukti.setSQL("select no_bukti,keterangan from trans_m where no_bukti='"+line.no_bukti+"' and kode_lokasi = '"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);										
						this.cb_bukti.setText(line.no_bukti);
						this.dp_d1.setText(line.tanggal);						
						this.cb_bdd.setText(line.akun_bdd);
						this.cb_pp.setText(line.kode_pp);
						this.cb_beban.setText(line.akun_beban);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_lama.setText(floatToNilai(line.jk));												
					}
				}	
				this.generateSch();
			}									
		} catch(e) {alert(e);}
	},	
	generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.e_lama.getText());
    		var so = nilaiToFloat(this.e_nilai.getText());
    		var dis = Math.round(so / lm);
    		var tot = 0;
			
			var tglNext = perAwal = this.dp_d1.getThnBln();
			var tgl = this.dp_d1.getText().substr(0,2);
			if (parseInt(tgl) > 28) tgl = "28";
            this.dataAngsuran = [];
            this.sg.clear();
    		for (var i = 0;i < lm;i++){			
				tglNext = perAwal;				
				this.dataAngsuran.push([tglNext,floatToNilai(dis)]);
				so = so - dis;
				if (so < dis) dis = so;
				else if ( i == lm - 2) dis = so; 			
				perAwal = getNextPeriode(perAwal);
				this.sg.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
    }
});