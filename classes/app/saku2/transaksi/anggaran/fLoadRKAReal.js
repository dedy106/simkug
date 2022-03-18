window.app_saku2_transaksi_anggaran_fLoadRKAReal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadRKAReal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fLoadRKAReal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data RKA dan Realisasi Thn Berjalan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true});
		this.bTampil = new button(this,{bound:[830,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
				
		this.p1 = new panel(this,{bound:[10,23,900,433],caption:"Daftar RKA dan Realisasi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
				colTitle:["Kode Akun","Nama","Kode PP","Nama PP","DC","RKA","Realisasi"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,50,200,80,240,80]],
				colFormat:[[5,6],[cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		//this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.e_periode.addItem(i,line.periode);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fLoadRKAReal.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fLoadRKAReal.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pembina_m','no_pembina',this.app._lokasi+"-PMBN"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_outlook where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'");			
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];						
						sql.add("insert into agg_pembina_d(nik,kode_param,periode,status,kode_drk,nilai,no_pembina,kode_lokasi,kode_akun)"+
								"values('"+line.nik+"','"+line.kode_param+"','"+this.e_tahun.getText()+line.jns_periode+"','"+line.status+"','"+line.kode_drk+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"')");
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){
		var strSQL = "select distinct a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp, "+
					"case when substring(a.kode_akun,1,1) = '3' then 'C' else 'D' end as dc,"+
					"d.gar,isnull(e.nilai,0) as nilai "+
					"from anggaran_d a "+
					"  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					"  inner join (select kode_akun,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as gar "+
					"   from anggaran_d "+
					"   where kode_lokasi = '"+this.app._lokasi+"' and substring(periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' "+
					"   group by kode_akun,kode_pp) d on a.kode_akun=d.kode_akun and a.kode_pp=d.kode_pp "+
					"  left join ( "+
					"	   select x.kode_akun,x.kode_pp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as nilai "+
					"	   from ( "+
					"			select * from gldt where kode_lokasi ='"+this.app._lokasi+"'  "+
					"			union "+
					"			select * from gldt_h where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%' "+
					"			) x "+
					"	   where x.kode_lokasi = '"+this.app._lokasi+"' and substring(x.periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' "+
					"	   group by x.kode_akun,x.kode_pp) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and substring(a.periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' and "+
					"substring(a.kode_akun,1,3) not in ('115','530') "+
					"union  "+
					"select distinct substring(a.kode_akun,1,6)+'0000' as kode_akun,'-' as nama_akun,a.kode_pp,c.nama as nama_pp, "+
					"case when substring(a.kode_akun,1,1) = '3' then 'C' else 'D' end as dc, "+
					"d.gar,isnull(e.nilai,0) as nilai "+
					"from anggaran_d a "+
					"  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					"  inner join ( "+
					"   select substring(kode_akun,1,6) as kode_akun,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as gar "+
					"   from anggaran_d "+
					"   where kode_lokasi = '"+this.app._lokasi+"' and substring(periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' "+
					"   group by substring(kode_akun,1,6),kode_pp) d on substring(a.kode_akun,1,6)=d.kode_akun and a.kode_pp=d.kode_pp "+
					"  left join ( "+
					"	   select substring(x.kode_akun,1,6) as kode_akun,x.kode_pp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as nilai "+
					"	   from ( "+
					"			select periode,kode_lokasi,kode_akun,'"+this.app._lokasi+"1000' as kode_pp,case when so_akhir>0 then 'D' else 'C' end as dc, so_akhir as nilai "+
					"			from glma where kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.e_periode.getText().substr(0,4)+""+this.app._lokasi+"' "+
					"			union "+
					"			select periode,kode_lokasi,kode_akun,kode_pp,dc,nilai from gldt where kode_lokasi ='"+this.app._lokasi+"'  "+
					"			union  "+
					"			select periode,kode_lokasi,kode_akun,kode_pp,dc,nilai from gldt_h where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%' "+
					"			) x "+
					"	   where x.kode_lokasi = '"+this.app._lokasi+"' and substring(x.periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' "+
					"	   group by substring(x.kode_akun,1,6) ,x.kode_pp) e on substring(a.kode_akun,1,6)=substring(e.kode_akun,1,6) and a.kode_pp=e.kode_pp "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and substring(a.periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' and "+
					"substring(a.kode_akun,1,3) in ('115','530')" ; 
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.dc.toUpperCase(),floatToNilai(line.gar),floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);
	},
	/*
	doLoad:function(sender){
		var strSQL = "";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase()]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi","");
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});