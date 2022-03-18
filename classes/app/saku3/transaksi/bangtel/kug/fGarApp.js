window.app_saku3_transaksi_bangtel_kug_fGarApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_kug_fGarApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_kug_fGarApp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval RRA", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		

		this.pc1 = new pageControl(this,{bound:[20,11,1000,460], childPage:["Data RRA","Approval RRA"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:0,
		      		colTitle:["No Pengajuan","No Dokumen","Tanggal","Keterangan","PP/Unit","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,200,300,80,150,100]],
					colFormat:[[5],[cfButton]],readOnly:true,
					click:[this,"doSgBtnClick"], colAlign:[[5],[alCenter]],													 
					readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});								

		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Status Approval",items:["APPROVE","NONAPP","RETURN"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,5,450,40],caption:"Catatan Approval",tag:9});						
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,21,996,359], childPage:["Item RRA","Cattn Approval"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,
					colTitle:["Bulan","Kode Akun","Nama Akun","Kode PP","Nama PP","Jenis","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,60,150,60,200,80,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					colFormat:[[6],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.sgctt = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-12,this.pc2.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[520,10,200,20],caption:"No Approval",maxLength:30,readOnly:true});
		this.e_nopdrk = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[520,33,200,20],caption:"No Usulan",readOnly:true});
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[520,55,450,20],caption:"Keterangan",readOnly:true});

		setTipeButton(tbSimpan);
		this.maximize();		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
						
			this.doLoadCtt(this.e_nopdrk.getText());
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_kug_fGarApp.extend(window.childForm);
window.app_saku3_transaksi_bangtel_kug_fGarApp.implement({
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
					this.doClick(this.i_gen);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					if (this.c_status.getText() == "APPROVE") var vProg = "1"; 
					if (this.c_status.getText() == "NONAPP") var vProg = "X"; 
					if (this.c_status.getText() == "RETURN") var vProg = "R"; 

					sql.add("update rra_pdrk_m set progress='"+vProg+"' where no_pdrk='"+this.e_nopdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							

					if (this.c_status.getText() == "APPROVE") {
							sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul)  "+		
											"select a.no_pdrk,a.kode_lokasi,a.no_urut,a.kode_pp,a.kode_akun,a.kode_drk,1,a.periode,a.nilai,a.nilai,a.dc,'-',b.nik_user,getdate(),'RRA' "+
											"from rra_pdrk_d a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk "+ 
											"where a.no_pdrk = '"+this.e_nopdrk.getText()+"' and a.dc ='D'"); 					
					}
					if (this.c_status.getText() == "NONAPP") sql.add("delete from anggaran_d where no_agg='"+this.e_nopdrk.getText()+"'");
							
					sql.add("update a set a.no_del='"+this.e_nb.getText()+"' "+
									"from rra_app_m a inner join rra_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
									"where b.no_bukti='"+this.e_nopdrk.getText()+"' and a.no_del='-' and a.kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','PUSAT','"+this.e_periode.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'APPPST')");
					sql.add("insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values "+
							"('"+this.e_nb.getText()+"','PUSAT','"+this.app._lokasi+"','"+this.e_nopdrk.getText()+"','"+this.app._lokasi+"','RRR','"+this.e_memo.getText()+"','"+this.c_status.getText()+"')");
								
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.doLoad();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
		this.doLoad();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app",this.app._lokasi+"-RRA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_memo.setFocus();
		}		
	},	
	doLoad:function(sender){		
		var strSQL = "select a.kode_pp+' - '+c.nama as pp,a.no_pdrk as no_bukti,b.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan "+
					 			 "from rra_pdrk_m a "+
								 "    inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
								 "    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "where a.modul = 'MULTI' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"'";							
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);					
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.pp,"Pilih"]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.e_nopdrk.setText(this.sg.cells(0,row));
			this.e_ket.setText(this.sg.cells(3,row));
			
			var str = "select b.catatan,b.no_app from rra_app_m a inner join rra_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_del='-' where b.no_bukti ='"+this.e_nopdrk+"' and b.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																		
				this.e_memo.setText(line.catatan);
				this.noAppLama = line.no_app;	
			}
			this.doLoadCtt(this.e_nopdrk.getText());
			
			this.sg2.clear();
			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun, "+
						 "a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc  "+
						 "from rra_pdrk_d a "+
						 "		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "		inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						 
						 "where a.no_pdrk = '"+this.e_nopdrk.getText()+"'  order by a.dc";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.dc.toUpperCase(),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report = "server_report_saku3_gar_rptAggApp";
							this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
							this.filter2 = "";
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();															
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
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doLoad();
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,a.tanggal,103) as tgl,tanggal "+
						 "from rra_app_m a inner join rra_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_bukti='"+kode+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.no_app<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,a.tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select b.catatan,a.no_app, convert(varchar,a.tanggal,103) as tgl,tanggal, convert(varchar,a.tgl_input,108) as jam,a.nik_user "+
								  			"from rra_app_m a inner join rra_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								  			"where b.no_bukti='"+kode+"' and a.tanggal='"+line.tanggal+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_app<>'"+this.noAppLama+"' "+
								  			"order by a.tanggal desc,convert(varchar,a.tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}		
});
