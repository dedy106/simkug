window.app_saku3_transaksi_kantintu_fStok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantintu_fStok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantintu_fStok";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Stock: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Stok"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[300,180,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,400,20],caption:"Keterangan", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[500,16,80,18],caption:"Load Data",click:[this,"doLoadData"]});		
		this.bRekon = new button(this.pc2.childPage[0],{bound:[600,16,80,18],caption:"Rekon Stok", click:[this,"doRekon"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Data Item Barang","Data Jumlah Fisik"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
		            colTitle:["Kode","Nama","Satuan","Stok Sistem","Selisih"],					
					colWidth:[[4,3,2,1,0],[100,100,50,250,150]],			
					readOnly:true,colFormat:[[3,4],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:0,
		            colTitle:["Kode","Jml Fisik"],					
					colWidth:[[1,0],[100,150]],			
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					readOnly:true,colFormat:[[1],[cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});		
				
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
		this.maximize();		
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
			
			this.cb_gudang.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kantintu_fStok.extend(window.portalui_childForm);
window.app_saku3_transaksi_kantintu_fStok.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},

	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},

	doRekon: function(sender){				
		try {
			var selisih = 0;
			var jml = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (this.dataJU.rs.rows[j].kode_obat == this.sg1.cells(0,i)) {						
						selisih = parseFloat(this.dataJU.rs.rows[j].stok) - parseFloat(this.sg1.cells(1,i));
						this.sg.cells(4,j,selisih);
						this.dataJU.rs.rows[j].selisih = selisih;
						this.dataJU.rs.rows[j].jml = this.sg1.cells(1,i);
					}
				}																			
			}	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					if (this.stsSimpan == 1) this.doClick();										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from kli_sop_m where no_sop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kli_sop_d where no_sop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}										
					sql.add("insert into kli_sop_m(no_sop,kode_lokasi,tanggal,no_dokumen,keterangan,kode_pp,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];																		
						sql.add("insert into kli_sop_d(no_sop,kode_lokasi,periode,nu,kode_obat,kode_pp,satuan,harga,stok,jumlah,selisih,total) values "+  
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+line.kode_obat+"','"+this.cb_gudang.getText()+"','"+line.satuan+"',0,"+line.stok+","+line.jml+","+line.selisih+",0)");
					}
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";								
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kli_sop_m where no_sop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kli_sop_d where no_sop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);
				this.bTampil.setVisible(true);				
				this.bUpload.setVisible(true);
				this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_sop_m","no_sop",this.app._lokasi+"-OP"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			
			if (this.stsSimpan == 1) this.doClick();
			this.doLoad3();		
		}catch(e) {alert(e);}
	},	
	doChange:function(sender){		
		if (sender == this.cb_gudang && this.stsSimpan == 1) {
			this.sg.clear(1);
		}				
	},	
	doLoadData:	function(sender){
		if (this.cb_gudang.getText()!="") {	
			var strSQL = "select count(no_kirim) as jml from kli_kirim_m where no_terima = '-' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					if (parseFloat(line.jml) != 0) {
						systemAPI.alert(this,"Stok Opname tidak dapat dilakukan.","Terdapat transaksi mutasi kirim yang belum diterima.");
						return false;
					}
				}
			}			
			var strSQL = "select a.kode_obat,a.nama,a.sat_kecil as satuan,isnull(b.stok,0) as stok, 0 as jml, 0 as selisih "+
			             "from kli_obat a "+
						 "inner join kli_stok b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_gudang.getText()+"' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;							
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Gudang harus diisi.","Pilih dari daftar");
		}			
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_obat,line.nama,line.satuan,floatToNilai(line.stok),floatToNilai(line.selisih)]); 
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
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
			this.sg.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.doLoad3();
			setTipeButton(tbAllFalse);			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);							
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_sop,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from kli_sop_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
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
			this.sg3.appendData([line.no_sop,line.tgl,line.no_dokumen,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select no_dokumen,keterangan,kode_pp "+
							 "from kli_sop_m "+							 
							 "where no_sop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);																								
						this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where kode_pp='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);															
						this.cb_gudang.setText(line.kode_pp);												
					}
				}												
								
				this.nik_user=this.app._userLog;						
				var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
										
				var strSQL = "select a.kode_obat,b.nama,a.satuan,a.jumlah,b.pabrik,c.stok,a.jumlah-c.stok as selisih "+
							 "from kli_sop_d a inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join kli_stok c on a.kode_obat=c.kode_obat and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
							 "where a.no_sop='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;							
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);					
				this.sg.validasi();							
			}									
		} catch(e) {alert(e);}
	}
});