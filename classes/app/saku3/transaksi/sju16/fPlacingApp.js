window.app_saku3_transaksi_sju16_fPlacingApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPlacingApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPlacingApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Placing", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");				
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["List Placing","Data Placing","Data Penanggung","Data Draft","Filter Cari"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:20,tag:9,
		            colTitle:["Status","No Placing","Tanggal","Tertanggung","Segmen","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Draft","User Input","Tgl Input"],
					colWidth:[[19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[110,150,80,60,60,200,200,200,70,70,80,80,80,60,80,100,200,70,150,80]],
					readOnly:true,colFormat:[[7,8,9,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load List",click:[this,"doLoad"]});

		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Catatan",tag:9,readOnly:true});				
		this.e_ttd = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Signer",multiSelection:false,change:[this,"doChange"]});
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Jabatan", maxlength:50});					
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Approve", readOnly:true});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"Tgl Placing", readOnly:true});	
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Placing", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Segmen", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Acc Exec", readOnly:true});					
		this.e_tglmulai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Period of Insurance", readOnly:true});
		this.e_tglselesai = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,17,100,20],labelWidth:0, caption:"", readOnly:true});								
		this.e_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency", readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Jenis Quotation", readOnly:true,visible:false});		
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Occup. of Risk", readOnly:true});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Loc. of Risk", readOnly:true});	
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Object of Risk", readOnly:true});

		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode","Nama Penanggung","Status"," % ","SumInsured","Premi","Brokerage"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,80,100,300,100]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});				

		this.mDesk = new tinymceCtrl(this.pc1.childPage[3],{bound:[10,13,980,410], withForm:false});
		
		this.c_status2 = new saiCB(this.pc1.childPage[4],{bound:[20,10,200,20],caption:"Status",items:["PLACING","APPROVAL"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,12,220,20],caption:"Tertanggung",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc1.childPage[4],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);			
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
		this.e_remark = new saiMemo(this.pc1.childPage[1],{bound:[520,300,450,110],caption:"Remarks",readOnly:true,tag:9});
		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			this.stsSimpan = 1;	
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			this.e_remark.setReadOnly(true);

			this.cb_cust2.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			this.c_status.setText("");		
	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPlacingApp.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPlacingApp.implement({	
	doLoad:function(sender){										
		var strSQL = "select a.no_placing,"+
		             "case a.progress when '0' then 'PLACING' "+
					 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+' | '+d.nama as cust,b.kode_pp+' | '+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,case when a.no_draft ='' then '-' else a.no_draft end as no_draft,e.nik+' | '+e.nama as user_input, a.tgl_input "+
		             "from sju_placing_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "inner join karyawan e on a.nik_user=e.nik and a.kode_lokasi=e.kode_lokasi "+
					 "left join sju_polis_m f on a.no_placing=f.no_placing and a.kode_lokasi=f.kode_lokasi "+
					 "where f.no_placing is null and a.periode<='"+this.e_periode.getText()+"' and a.progress = '0' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_placing ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.status.toUpperCase(),line.no_placing,line.tanggal,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_draft,line.user_input,line.tgl_input]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	mainButtonClick: function(sender, desk){
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																			
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";												
					 										
					sql.add("update sju_placing_m set progress='"+prog+"',no_app='"+this.e_nb.getText()+"',ttd='"+this.e_ttd.getText()+"',jabatan='"+this.e_jab.getText()+"' where no_placing='"+this.e_noplacing.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from sju_app_m a inner join sju_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_noplacing.getText()+"' and b.modul='PLACING' and b.kode_lokasi='"+this.app._lokasi+"'");
												
					sql.add("insert into sju_app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','PLACING','-')");
					sql.add("insert into sju_app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','PLACING','"+this.e_noplacing.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
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
					this.sg.clear(1); 
					this.sg3.clear(1);  
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
					this.mDesk.setCode(urldecode(""));						
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;		
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				sql.add("delete from sju_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_app_d where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update sju_placing_m set progress='0',no_app='-' where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);			
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.e_noplacing.getText()!="") {						
			var AddFormat = "AP/"+this.e_periode.getText().substr(2,4)+"/___PL";			
			var data = this.dbLib.getDataProvider("select isnull(max(no_app),0) as no_app from sju_app_m where no_app like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"' and modul='PLACING'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_app == "0") {
						this.e_nb.setText("AP/"+this.e_periode.getText().substr(2,4)+"/001PL");						
					}
					else {
						var idx = parseFloat(line.no_app.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("AP/"+this.e_periode.getText().substr(2,4)+"/"+nu+"PL");						
					}
				} 
			}			
			this.c_status.setFocus();						
		}
	},		
	doChange:function(sender){
		if (sender == this.e_ttd && this.e_ttd.getText() != "") {
			var strSQL = "select jabatan from karyawan "+
						 "where nik='"+this.e_ttd.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_jab.setText(line.jabatan);
				}
			}		
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				this.e_noplacing.setText(this.sg.cells(1,row));
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_cust.setText(this.sg.cells(3,row));
				this.e_pp.setText(this.sg.cells(4,row));				
				this.e_pic.setText(this.sg.cells(5,row));
				this.e_tglmulai.setText(this.sg.cells(10,row));
				this.e_tglselesai.setText(this.sg.cells(11,row));
				this.e_curr.setText(this.sg.cells(6,row));
				this.e_total.setText(this.sg.cells(7,row));
				this.e_npremi.setText(this.sg.cells(8,row));
				this.e_nfee.setText(this.sg.cells(9,row));
				this.e_ppremi.setText(this.sg.cells(15,row));
				this.e_pfee.setText(this.sg.cells(16,row));				
				this.doClick();
				
				var strSQL = "select a.jenis,a.slip,a.lokasi,a.occup,a.objek,a.catat,a.ttd "+
						 	 "from sju_placing_m a inner join karyawan b on a.ttd=b.nik and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_placing='"+this.e_noplacing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.mDesk.setCode(urldecode(line.slip));	
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);	
						this.e_ttd.setText(line.ttd);																
						this.e_jenis.setText(line.jenis);	
						this.e_remark.setText(line.catat);																
					}
				}								
				
				var strSQL = "select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
							 "from sju_placing_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_placing = '"+this.e_noplacing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg3.appendData([line.kode_vendor, line.nama, line.status, floatToNilai(line.persen), floatToNilai(line.total), floatToNilai(line.n_premi), floatToNilai(line.n_fee)]);
					}
				} else this.sg3.clear(1);						
				
				if (this.sg.cells(0,row) == "PLACING") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
					var strSQL = "select a.no_app,case b.status when '1' then 'APPROVE' else 'REVISI' end as status,b.catatan "+
								 "from sju_app_m a inner join sju_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' and a.modul='PLACING' "+
								 "where b.no_bukti='"+this.e_noplacing.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.c_status.setText(line.status.toUpperCase());
							this.e_memo.setText(line.catatan);	
							this.noAppLama = line.no_app;													
						}
					}	
				}

			}
		} catch(e) {alert(e);}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if (this.preView == "1" && this.c_status.getText() == "APPROVE") {								
								this.nama_report="server_report_saku3_sju16_rptPrPlacing";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_placing='"+this.e_noplacing.getText()+"' ";
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
			this.sg.clear(1); 
			this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbSimpan);
			this.mDesk.setCode(urldecode(""));			
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){						
		var filter = "";
		if (this.c_status2.getText() == "PLACING") filter = " and a.progress = '0' ";
		if (this.c_status2.getText() == "APPROVAL") filter = " and a.progress in ('1','R') "; 
		
		if (this.cb_cust2.getText()!="") filter = filter+" and a.kode_cust='"+this.cb_cust2.getText()+"' ";		
		
		var strSQL = "select a.no_placing,"+
		             "case a.progress when '0' then 'PLACING' "+
					 "                when '1' then 'APPPLACING' "+
					 "                when 'R' then 'APPREVISI' "+
					 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+' | '+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+' | '+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft,e.nik+' | '+e.nama as user_input,a.tgl_input  "+
		             "from sju_placing_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "inner join karyawan e on a.nik_user=e.nik and a.kode_lokasi=e.kode_lokasi "+
					 "left join sju_polis_m f on a.no_placing=f.no_placing and a.kode_lokasi=f.kode_lokasi "+
					 "where f.no_placing is null and a.kode_lokasi='"+this.app._lokasi+"' "+filter;					
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	}
});